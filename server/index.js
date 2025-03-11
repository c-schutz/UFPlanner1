import express from "express";
import cors from "cors"; // Import the CORS package
import pool from "./database.js"
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows Express to parse JSON bodies
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
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
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
