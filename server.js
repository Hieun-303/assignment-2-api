const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const referenceRoutes = require("./routes/referenceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// test route
app.get("/", (req, res) => {
res.send("Backend is running");
});

// api routes
app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res, next) => {
next(createError(404, "Route not found"));
});

// global error handler
app.use((err, req, res, next) => {
res.status(err.status || 500).json({
success: false,
message: err.message || "Internal Server Error",
});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});