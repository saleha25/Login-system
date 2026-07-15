const express = require("express");
const router = express.Router();

const {
    getUserAnalytics
} = require("../controllers/userAnalyticsController");

router.get("/", getUserAnalytics);

module.exports = router;