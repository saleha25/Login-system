const express = require("express");//Express is a web framework for Node.js.
const dotenv = require("dotenv");//dotenv loads environment variables from a .env file into process.env
require("./cron/systemHealthCron");
require("./cron/userCleanupCron");
require("./cron/reminderCron");
require("./cron/passwordResetCleanupCron");
const errorHandler = require("./middleware/errorMiddleware");
const { sequelize } = require("./models");
const crudUserRoutes = require("./routes/crudUserRoutes");
const roleRoutes = require("./routes/roleRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const userLogRoutes = require("./routes/userLogRoutes");
const documentRoutes = require("./routes/documentRoutes");
const rolePermissionRoutes = require("./routes/rolePermissionRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const permissionMatrixRoutes = require("./routes/permissionMatrixRoutes");
const loginHistoryRoutes = require("./routes/loginHistoryRoutes");
const userSearchRoutes = require("./routes/userSearchRoutes");
const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
const roleUsageRoutes =require("./routes/roleUsageRoutes");
const inactiveUsersRoutes=require("./routes/inactiveUsersRoutes");
const organizationReportRoutes =require("./routes/organizationReportRoutes");
const permissionAuditRoutes =require("./routes/permissionAuditRoutes");
const duplicateEmailRoutes =require("./routes/duplicateEmailRoutes");
const userActivityRoutes =require("./routes/userActivityRoutes");
const globalSearchRoutes =require("./routes/globalSearchRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
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
app.use("/api/user-logs", userLogRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/role-permissions", rolePermissionRoutes);
app.use("/api/password-resets", passwordResetRoutes);
app.use("/api/user-details", userDetailsRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/permission-matrix", permissionMatrixRoutes);
app.use("/api/login-history",loginHistoryRoutes);
app.use("/api/user-search",userSearchRoutes);
app.use("/api/user-analytics", userAnalyticsRoutes);
app.use("/api/role-usage",roleUsageRoutes);
app.use("/api/inactive-users",inactiveUsersRoutes);
app.use("/api/organization-report",organizationReportRoutes);
app.use("/api/permission-audit",permissionAuditRoutes);
app.use("/api/duplicate-emails",duplicateEmailRoutes);
app.use("/api/user-activity",userActivityRoutes);
app.use("/api/global-search",globalSearchRoutes);
app.use("/api/admin-dashboard", adminDashboardRoutes);
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