const IORedis = require("ioredis");

const redis = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

console.log("Configured:", redis.options.maxRetriesPerRequest);
process.exit();