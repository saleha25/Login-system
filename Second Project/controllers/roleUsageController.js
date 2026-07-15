const {

Role,
User,
Permission,
Organization

} = require("../models");

const { fn, col } = require("sequelize");

const getRoleUsage = async (req, res) => {

    try {

        const roles = await Role.findAll({

            include: [

                {
                    model: User,

                    attributes: [],

                    include: [

                        {

                            model: Organization,

                            attributes: [],

                            through: {

                                attributes: []

                            }

                        }

                    ]

                },

                {

                    model: Permission,

                    attributes: [],

                    through: {

                        attributes: []

                    }

                }

            ],

            attributes: [

                "id",

                "roleName",

                [

                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("Users.id")
                        )
                    ),

                    "totalUsers"

                ],

                [

                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("Permissions.id")
                        )
                    ),

                    "totalPermissions"

                ],

                [

                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("Users->Organizations.id")
                        )
                    ),

                    "organizationsUsingRole"

                ]

            ],

            group: [

                "Role.id"

            ],

            order: [

                [

                    fn(
                        "COUNT",
                        fn(
                            "DISTINCT",
                            col("Users.id")
                        )
                    ),

                    "DESC"

                ]

            ]

        });

        res.status(200).json({

            roles

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getRoleUsage

};