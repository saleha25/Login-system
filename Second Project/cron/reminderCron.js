const cron = require("node-cron");

const { Task, JobLog } = require("../models");

const { Op } = require("sequelize");

cron.schedule("* * * * *", async () => {

    try {

        const now = new Date();

        const nextHour = new Date();

        nextHour.setHours(nextHour.getHours() + 1);

        const tasks = await Task.findAll({

            where: {

                dueDate: {

                    [Op.between]: [

                        now,

                        nextHour

                    ]

                },

                status: "Pending"

            }

        });

        tasks.forEach(task => {

            console.log(`Reminder: ${task.title} is due within the next hour.`);

        });

        await JobLog.create({

            jobName: "Reminder Job",

            executionTime: new Date(),

            status: "Success",

            errorMessage: null

        });

    }

    catch (error) {

        console.log(error);

        await JobLog.create({

            jobName: "Reminder Job",

            executionTime: new Date(),

            status: "Failed",

            errorMessage: error.message

        });

    }

});