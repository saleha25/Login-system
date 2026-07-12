const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Built-in Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});