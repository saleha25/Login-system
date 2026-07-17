const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { generateReport } = require("../services/reportService");

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});

const worker = new Worker(
    "report-generation",
    async (job) => {

        console.log(`Processing Report: ${job.data.reportName}`);

        // Simulate failure for testing
        if (job.data.reportName === "FailReport") {
            throw new Error("Report Generation Failed!");
        }

        await generateReport(job.data.reportName);

        console.log("Report Generated Successfully");

    },
    {
        connection,
    }
);

// Success
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully.`);
});

// Retry Logging
worker.on("failed", async (job, err) => {

    console.log("--------------------------------");
    console.log(`Job ${job.id} Failed`);
    console.log(`Attempt ${job.attemptsMade} of ${job.opts.attempts}`);
    console.log(err.message);
    console.log("--------------------------------");

});