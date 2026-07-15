const {
    User,
    Organization,
    Role,
    Permission,
    Session
} = require("../models");

const { Op } = require("sequelize");

const getOrganizationDashboard = async (req, res) => {

    try {

        const organizationId = req.params.id;

        // Organization Details
        const organization = await Organization.findByPk(organizationId);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found."
            });
        }

        // Total Users
        const totalUsers = await User.count({
            where: {
                organizationId: organizationId
            }
        });

        // Total Active Users
        const totalActiveUsers = await User.count({
            where: {
                organizationId: organizationId,
                status: "Active"
            }
        });

        // Total Roles
        const totalRoles = await Role.count();

        // Total Permissions
        const totalPermissions = await Permission.count();

        // Users Registered Today
        const today = new Date();
        today.setHours(0,0,0,0);

        const usersRegisteredToday = await User.count({
            where:{
                organizationId: organizationId,
                createdAt:{
                    [Op.gte]: today
                }
            }
        });

        // Latest Registered User
        const latestUser = await User.findOne({
            where:{
                organizationId: organizationId
            },
            order:[
                ["createdAt","DESC"]
            ]
        });

        res.status(200).json({

            organization,

            statistics:{
                totalUsers,
                totalActiveUsers,
                totalRoles,
                totalPermissions,
                usersRegisteredToday
            },

            latestUser

        });

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports={
    getOrganizationDashboard
};