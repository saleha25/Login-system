const {
    User,
    Session,
    Role,
    Organization
} = require("../models");

const { Op, fn, col, where } = require("sequelize");

const getInactiveUsers = async (req, res) => {

    try {

        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const users = await User.findAll({

            include: [
                {
                    model: Session,
                    attributes: []
                },
                {
                    model: Role
                },
                {
                    model: Organization,
                    through: {
                        attributes: []
                    }
                }
            ],

            attributes: [
                "id",
                "name",
                "email",
                [
                    fn("MAX", col("Sessions.createdAt")),
                    "lastLogin"
                ]
            ],

            group: [
                "User.id",
                "Role.id",
                "Organizations.id"
            ],

            having: where(
                fn("MAX", col("Sessions.createdAt")),
                {
                    [Op.lt]: ninetyDaysAgo
                }
            ),

            order: [
                [
                    fn("MAX", col("Sessions.createdAt")),
                    "ASC"
                ]
            ]

        });

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getInactiveUsers
};