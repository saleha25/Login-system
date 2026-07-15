const {
    User,
    Role,
    Organization,
    Session,
    PasswordReset
} = require("../models");

const { fn, col } = require("sequelize");

const getUserActivity = async (req, res) => {

    try {

        const users = await User.findAll({

            include: [

                {
                    model: Role,
                    attributes: [
                        "id",
                        "roleName"
                    ]
                },

                {
                    model: Organization,
                    attributes: [
                        "id",
                        "organizationName"
                    ],
                    through: {
                        attributes: []
                    }
                },

                {
                    model: Session,
                    attributes: []
                },

                {
                    model: PasswordReset,
                    attributes: []
                }

            ],

            attributes: [

                "id",

                "name",

                "email",

                "status",

                "isVerified",

                [
                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("Sessions.id")
                        )
                    ),
                    "loginCount"
                ],

                [
                    fn(
                        "MAX",
                        col("Sessions.createdAt")
                    ),
                    "lastLogin"
                ],

                [
                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("PasswordResets.id")
                        )
                    ),
                    "passwordResetCount"
                ],

                [
                    fn(
                        "MAX",
                        col("PasswordResets.createdAt")
                    ),
                    "lastPasswordReset"
                ]

            ],

            group: [

                "User.id",

                "Role.id",

                "Organizations.id"

            ],

            order: [

                ["name", "ASC"]

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

    getUserActivity

};