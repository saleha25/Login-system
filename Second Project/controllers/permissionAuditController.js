const {
    User,
    Role,
    Permission,
    Organization
} = require("../models");

const { Op } = require("sequelize");

const getPermissionAudit = async (req, res) => {

    try {

        const permission = req.query.permission;

        if (!permission) {
            return res.status(400).json({
                message: "Permission name is required."
            });
        }

        const users = await User.findAll({

            include: [

                {
                    model: Role,
                    required: true,

                    include: [

                        {
                            model: Permission,
                            required: true,

                            where: {
                                permissionName: {
                                    [Op.iLike]: `%${permission}%`
                                }
                            },

                            through: {
                                attributes: []
                            }
                        }

                    ]
                },

                {
                    model: Organization,

                    through: {
                        attributes: []
                    }
                }

            ]

        });

        res.status(200).json({

            totalUsers: users.length,

            users

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getPermissionAudit

};