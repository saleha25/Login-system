const cron = require("node-cron");

const { User, Session, JobLog } = require("../models");

const { Op } = require("sequelize");

cron.schedule("0 0 * * *", async () => {

    try {

        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sessions = await Session.findAll({

            where: {

                createdAt: {

                    [Op.lt]: thirtyDaysAgo

                }

            }

        });

        const userIds = sessions.map(session => session.userId);

        await User.update(

            {

                status: "Inactive"

            },

            {

                where: {

                    id: {

                        [Op.in]: userIds

                    }

                }

            }

        );

        console.log("Inactive users updated successfully.");

        await JobLog.create({

            jobName: "User Cleanup",

            executionTime: new Date(),

            status: "Success",

            errorMessage: null

        });

    }

    catch (error) {

        console.log(error);

        await JobLog.create({

            jobName: "User Cleanup",

            executionTime: new Date(),

            status: "Failed",

            errorMessage: error.message

        });

    }

});