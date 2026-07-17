const {
    User,
    Organization,
    Role,
    Permission,
    Session
} = require("../models");

const { Op } = require("sequelize");
const redis = require("../config/cache");

const getOrganizationDashboard = async (req, res) => {

    try {

        const organizationId = req.params.id;

        // Redis Cache Key
        const cacheKey = `dashboard:${organizationId}`;

        // Check Cache
        const cachedDashboard = await redis.get(cacheKey);

        if (cachedDashboard) {

            console.log("Returning Dashboard from Cache");

            return res.status(200).json({
                source: "Cache",
                ...JSON.parse(cachedDashboard)
            });

        }

        // Fetch Organization
        const organization = await Organization.findByPk(organizationId);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found."
            });
        }

        // Total Users
        const totalUsers = await User.count();

        // Total Active Users
        const totalActiveUsers = await User.count({
            where: {
                status: "Active"
            }
        });

        // Total Roles
        const totalRoles = await Role.count();

        // Total Permissions
        const totalPermissions = await Permission.count();

        // Users Registered Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usersRegisteredToday = await User.count({
            where: {
                createdAt: {
                    [Op.gte]: today
                }
            }
        });

        // Latest Registered User
        const latestUser = await User.findOne({
            order: [
                ["createdAt", "DESC"]
            ]
        });

        // Dashboard Data
        const dashboardData = {

            organization,

            statistics: {
                totalUsers,
                totalActiveUsers,
                totalRoles,
                totalPermissions,
                usersRegisteredToday
            },

            latestUser

        };

        // Cache for 5 Minutes
        await redis.set(
            cacheKey,
            JSON.stringify(dashboardData),
            "EX",
            300
        );

        console.log("Dashboard Cached for 5 Minutes");

        res.status(200).json({
            source: "Database",
            ...dashboardData
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getOrganizationDashboard
};