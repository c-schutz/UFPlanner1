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
app.post('/Budget/Allocation', (req, res) => {
  try {
    const requestData = req.body;
    // console.log("Received data:", requestData);
    
    const pieChart = Visualize(tempBudgetInput);

    const responseData = {
      message: 'Data received successfully',
      name: 'John Doe',
      age: 30,
      receivedData: requestData, // Echo back the received data
      pie: pieChart
    };
   
    res.json(responseData);
  } catch (error) {
    console.error('Error processing POST request:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Login route
app.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);  // Log request data

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Query to find user by email
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = rows[0];

        // Check if password matches (Assuming plain text, should use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Successful login
        res.json({ message: "Login successful", user });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);  // Log request data

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      // Query to check if the email exists
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (rows.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
      }
  
      // Insert new user into the database
      const result = await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
  
      if (result[0].affectedRows > 0) {
          return res.status(201).json({ message: "Account created successfully" });
      } else {
          return res.status(500).json({ message: "Failed to create account" });
      }
  } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});