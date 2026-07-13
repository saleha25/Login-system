const express = require("express");//Express is a web framework for Node.js.
const dotenv = require("dotenv");//dotenv loads environment variables from a .env file into process.env
const errorHandler = require("./middleware/errorMiddleware");
const { sequelize } = require("./models");
const crudUserRoutes = require("./routes/crudUserRoutes");
const roleRoutes = require("./routes/roleRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const permissionRoutes = require("./routes/permissionRoutes");

dotenv.config();

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", crudUserRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/permissions",permissionRoutes);
app.use(errorHandler);

sequelize.sync({alter:true})
    .then(() => {
        console.log("Database synced successfully.");
        console.log("PostgreSQL connected successfully.");
    })
    .catch((err) => {
        console.error(err);
    });

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});