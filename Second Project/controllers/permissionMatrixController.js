const { Role, Permission, User } = require("../models");
const { fn, col } = require("sequelize");

const getPermissionMatrix = async (req, res) => {

    try {

        const roles = await Role.findAll({

            include: [

                {
                    model: Permission,
                    through: {
                        attributes: []
                    }
                },

                {
                    model: User,
                    attributes: []
                }

            ],

            attributes: [

                "id",
                "roleName",

                [
                    fn("COUNT", col("Users.id")),
                    "totalUsers"
                ]

            ],

            group: [

                "Role.id",
                "Permissions.id"

            ],

            order: [

                [
                    fn("COUNT", col("Users.id")),
                    "DESC"
                ]

            ]

        });

        res.json(roles);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getPermissionMatrix

};