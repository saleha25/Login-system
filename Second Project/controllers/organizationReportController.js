const {
    Organization,
    User,
    Role,
    Session
} = require("../models");

const { fn, col, literal } = require("sequelize");

const getOrganizationReport = async (req, res) => {

    try {

        const organizations = await Organization.findAll({

            include: [

                {

                    model: User,

                    attributes: [],

                    through: {
                        attributes: []
                    },

                    include: [

                        {
                            model: Role,
                            attributes: []
                        },

                        {
                            model: Session,
                            attributes: []
                        }

                    ]

                }

            ],

            attributes: [

                "id",

                "organizationName",

                "email",

                "phone",

                "address",

                [
                    fn(
                        "COUNT",
                        fn("DISTINCT", col("Users.id"))
                    ),
                    "totalUsers"
                ],

                [
                    fn(
                        "MAX",
                        col("Users->Sessions.createdAt")
                    ),
                    "latestLogin"
                ],

                [
                    fn(
                        "COUNT",
                        col("Users->Sessions.id")
                    ),
                    "totalLoginSessions"
                ],

                [
                    literal(`COUNT(DISTINCT CASE WHEN "Users->Role"."roleName"='Admin' THEN "Users"."id" END)`),
                    "totalAdmins"
                ],

                [
                    literal(`COUNT(DISTINCT CASE WHEN "Users->Role"."roleName"='Manager' THEN "Users"."id" END)`),
                    "totalManagers"
                ],

                [
                    literal(`COUNT(DISTINCT CASE WHEN "Users->Role"."roleName"='Employee' THEN "Users"."id" END)`),
                    "totalEmployees"
                ]

            ],

            group: [

                "Organization.id"

            ],

            order: [

                ["organizationName","ASC"]

            ]

        });

        res.status(200).json({

            organizations

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports={

getOrganizationReport

};