import express from "express";
import cors from "cors"; // Import the CORS package

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
