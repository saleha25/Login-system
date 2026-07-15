const { Session } = require("../models");

const getLoginHistory = async (req, res) => {

    try {

        const sessions = await Session.findAll({

            where: {
                userId: req.params.id
            },

            order: [
                ["createdAt", "DESC"]
            ],

            limit: 20

        });

        const history = sessions.map(session => {

            const loginTime = new Date(session.createdAt);

            const logoutTime = new Date(session.logoutTime);

            const duration =
                Math.round(
                    (logoutTime - loginTime) / 60000
                );

            return {

                loginTime,

                logoutTime,

                sessionDuration: duration + " minutes",

                ipAddress: session.ipAddress,

                device: session.device,

                browser: session.browser

            };

        });

        res.status(200).json({

            totalSessions: history.length,

            history

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getLoginHistory

};