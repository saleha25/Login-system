const express = require("express");

const router = express.Router();

const {

getRoleUsage

} = require("../controllers/roleUsageController");

router.get("/", getRoleUsage);

module.exports = router;