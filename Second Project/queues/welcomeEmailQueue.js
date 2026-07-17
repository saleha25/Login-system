const { Queue } = require("bullmq");
const connection = require("../config/redis");

const welcomeEmailQueue = new Queue("welcome-email", {
  connection,
});

module.exports = welcomeEmailQueue;