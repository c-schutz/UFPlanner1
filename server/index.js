import express from "express";
import cors from "cors"; // Import the CORS package
import { Visualize } from './datacollect.js';
import pool from "./database.js"
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const tempBudgetInput = {
  categories: {
    needs: 50,
    wants: 30,
    savings: 20
  },
  userID: 1,
  budgetID: 1
}

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Original POST endpoint POST is for sending data since it doesn't appear on the url
app.post('/Budget/Allocation', async (req, res) => {
  try {
    const userID = parseInt(req.body.data.userID, 10);
    const budgetName = req.body.data.bname;
    const { data: budgetData } = req.body;
    const height = req.body.screenheight;
    console.log("Received data:", req.body);

    if (!req.body.isLoggedIn) {
      const svgArray = Visualize(req.body.data, height);

      const responseData = {
        message: 'Data received successfully',
        name: 'John Doe',
        age: 30,
        receivedData: req.body,
        svgs: svgArray
      };

      res.json(responseData);
    } else {
      if (!userID) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const [userData] = await pool.query('SELECT data FROM budgets WHERE userID = ?', [userID]);

      if (userData.length) {
        // There's existing data, append new data
        let updatedBudgetData = userData[0].data ? userData[0].data : [];
        updatedBudgetData.push(budgetData);
        await pool.query('UPDATE budgets SET data = ? WHERE userID = ?', [JSON.stringify(updatedBudgetData), userID]);
        res.json({ message: "Budget data updated successfully" });
      } else {
        // No existing data, create new entry
        await pool.query('INSERT INTO budgets (userID, data) VALUES (?, ?)', [userID, JSON.stringify([budgetData])]);
        res.json({ message: "Budget entry created successfully" });
      }
    }
  } catch (error) {
    console.error('Error processing POST request:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Successful login
    res.json({
      message: "Login successful",
      userID: user.id, // Return the user's ID
      user: user // Optionally return more user details as needed
    });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [checkEmail] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (checkEmail.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const [result] = await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);

    if (result.affectedRows > 0) {
      const userId = result.insertId; // Get the ID of the newly created user
      return res.status(201).json({
        message: "Account created successfully",
        userID: userId // Return the user's ID
      });
    } else {
      return res.status(500).json({ message: "Failed to create account" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/budget-data", async (req, res) => {
  const userID = parseInt(req.body.userID, 10); // Convert userID from string to integer
  const screenHeight = req.body.screenheight;
  if (!userID) {
    return res.status(400).json({ error: "Invalid or no User ID provided" });
  }

  try {
    // Fetch the budget data associated with the userID
    const [results] = await pool.query('SELECT data FROM budgets WHERE userID = ?', [userID]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No budget data found for the given user ID" });
    }

    const budgetData = results[0].data;

    // Process the data with the Visualize function
    // Assuming Visualize function accepts budget data and returns the visualized data
    const visualizedData = Visualize(budgetData, screenHeight);

    // Return the visualized data as the response
    res.json({
      visualizedData: visualizedData,
      rawdata: budgetData
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/delete", async (req, res) => {
  const { bIndex, userID } = req.body;

  if (bIndex === undefined || !userID) {
    return res.status(400).json({ message: "Both bIndex and userID are required" });
  }

  try {
    // Fetch the current budget data for the user
    const [budgets] = await pool.query('SELECT data FROM budgets WHERE userID = ?', [userID]);
    if (budgets.length === 0) {
      return res.status(404).json({ message: "Budget data not found for this user" });
    }

    // Parse the data column, which should be an array of budgets
    let budgetData = budgets[0].data;

    // Check if bIndex is within bounds
    if (bIndex < 0 || bIndex >= budgetData.length) {
      return res.status(400).json({ message: "Invalid bIndex provided" });
    }

    // Remove the element at bIndex
    budgetData.splice(bIndex, 1);

    // Update the database with the new budget data
    await pool.query('UPDATE budgets SET data = ? WHERE userID = ?', [JSON.stringify(budgetData), userID]);

    res.json({ message: "Budget entry deleted successfully" });

  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});