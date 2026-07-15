const {
    User,
    Organization,
    Role,
    Permission,
    Session
} = require("../models");

const getUserDetails = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id, {

            include: [

                {
                    model: Organization,
                    through: {
                        attributes: []
                    }
                },

                {
                    model: Role,
                    include: [
                        {
                            model: Permission,
                            through: {
                                attributes: []
                            }
                        }
                    ]
                },

                {
                    model: Session,
                    separate: true,
                    limit: 1,
                    order: [["createdAt", "DESC"]]
                }

            ]

        });

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        const totalSessions = await Session.count({
            where: {
                userId: user.id
            }
        });

        res.json({

            user,

            totalSessions

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getUserDetails

};