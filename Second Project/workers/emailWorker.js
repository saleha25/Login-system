const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { sendWelcomeEmail } = require("../services/emailService");

// Dedicated Redis connection for Worker
const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

console.log("Worker Redis maxRetriesPerRequest:", connection.options.maxRetriesPerRequest);

const emailWorker = new Worker(
  "welcome-email",
  async (job) => {
    console.log("Processing Job...");

    const { email, name } = job.data;

    await sendWelcomeEmail(email, name);

    console.log("Welcome Email Sent Successfully");
  },
  {
    connection,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed.`);
  console.error(err);
});

emailWorker.on("error", (err) => {
  console.error("Worker Error:", err);
});