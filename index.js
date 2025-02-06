const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");  // Changed this line
const taskRoutes = require("./routes/taskRoutes");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));