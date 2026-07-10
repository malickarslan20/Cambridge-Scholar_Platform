require ("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});