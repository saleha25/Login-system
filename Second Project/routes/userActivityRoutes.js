const express = require("express");

const router = express.Router();

const {
    getUserActivity
} = require("../controllers/userActivityController");

router.get("/", getUserActivity);

module.exports = router;