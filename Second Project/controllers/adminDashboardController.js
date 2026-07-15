const {
    User,
    Organization,
    Role,
    Permission,
    Session,
    PasswordReset
} = require("../models");

const { Op } = require("sequelize");

const getAdminDashboard = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            totalUsers,
            activeUsers,
            totalOrganizations,
            totalRoles,
            totalPermissions,
            newUsersToday,
            latestRegisteredUsers,
            latestLoginSessions,
            organizations,
            recentPasswordResetRequests
        ] = await Promise.all([

            User.count(),

            User.count({
                where: {
                    status: "Active"
                }
            }),

            Organization.count(),

            Role.count(),

            Permission.count(),

            User.count({
                where: {
                    createdAt: {
                        [Op.gte]: today
                    }
                }
            }),

            User.findAll({
                limit: 5,
                order: [["createdAt", "DESC"]],
                attributes: [
                    "id",
                    "name",
                    "email",
                    "createdAt"
                ]
            }),

            Session.findAll({
                limit: 5,
                order: [["createdAt", "DESC"]],
                include: [{
                    model: User,
                    attributes: [
                        "id",
                        "name",
                        "email"
                    ]
                }]
            }),

            Organization.findAll({

                include: [

                    {
                        model: User,

                        through: {
                            attributes: []
                        },

                        attributes: [
                            "id"
                        ]

                    }

                ]

            }),

            PasswordReset.findAll({

                limit: 5,

                order: [
                    ["createdAt", "DESC"]
                ],

                include: [

                    {
                        model: User,

                        attributes: [
                            "id",
                            "name",
                            "email"
                        ]

                    }

                ]

            })

        ]);

        let topOrganization = null;

        if (organizations.length > 0) {

            topOrganization = organizations.reduce((max, org) => {

                return org.Users.length > max.Users.length
                    ? org
                    : max;

            });

        }

        res.status(200).json({

            totalUsers,

            activeUsers,

            totalOrganizations,

            totalRoles,

            totalPermissions,

            newUsersToday,

            latestRegisteredUsers,

            latestLoginSessions,

            topOrganization: topOrganization
                ? {
                    id: topOrganization.id,
                    organizationName: topOrganization.organizationName,
                    totalUsers: topOrganization.Users.length
                }
                : null,

            recentPasswordResetRequests

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getAdminDashboard

};