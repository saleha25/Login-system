const cron = require("node-cron");

const { JobLog } = require("../models");

cron.schedule("0 0 * * *", async () => {

    try {

        console.log("System Health Check");

        await JobLog.create({

            jobName: "Daily System Health Check",

            executionTime: new Date(),

            status: "Success",

            errorMessage: null

        });

    }

    catch(error){

        await JobLog.create({

            jobName: "Daily System Health Check",

            executionTime: new Date(),

            status: "Failed",

            errorMessage: error.message

        });

    }

});