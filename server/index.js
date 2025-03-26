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

// Add a GET endpoint to match the frontend request
// app.get('/Budget/Allocation', (req, res) => {
//   try {
//     let r = Testing();
//     console.log("GET request to /Budget/Allocation:", r);
//     const data = {
//       message: 'This is data from the GET endpoint',
//       name: 'John Doe',
//       age: 30
//     };
//     res.json(data);
//   } catch (error) {
//     console.error('Error processing GET request:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Original POST endpoint POST is for sending data since it doesn't appear on the url
app.post('/Budget/Allocation', async (req, res) => {
  try {
    const userID = parseInt(req.body.data.userID, 10);
    const { data: budgetData } = req.body;
    console.log("Received data:", req.body);

    if (!req.body.isLoggedIn) {
      const svgArray = Visualize(req.body.data);

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});