const { User } = require("../models");
const { fn, col, where, Op } = require("sequelize");

const getDuplicateEmails = async (req, res) => {

    try {

        const duplicates = await User.findAll({

            attributes: [

                "email",

                [
                    fn("COUNT", col("email")),
                    "totalUsers"
                ],

                [
                    fn("STRING_AGG", col("name"), ", "),
                    "users"
                ]

            ],

            group: ["email"],

            having: where(
                fn("COUNT", col("email")),
                {
                    [Op.gt]: 1
                }
            ),

            raw: true

        });

        res.status(200).json({

            totalDuplicateEmails: duplicates.length,

            duplicates

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getDuplicateEmails

};