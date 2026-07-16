const cron = require("node-cron");

const { PasswordReset, JobLog } = require("../models");

const { Op } = require("sequelize");

cron.schedule("0 * * * *", async () => {

    try {

        const deleted = await PasswordReset.destroy({

            where: {

                expiresAt: {

                    [Op.lt]: new Date()

                }

            }

        });

        console.log(`${deleted} expired password reset tokens deleted.`);

        await JobLog.create({

            jobName: "Password Reset Cleanup",

            executionTime: new Date(),

            status: "Success",

            errorMessage: null

        });

    }

    catch (error) {

        console.log(error);

        await JobLog.create({

            jobName: "Password Reset Cleanup",

            executionTime: new Date(),

            status: "Failed",

            errorMessage: error.message

        });

    }

});