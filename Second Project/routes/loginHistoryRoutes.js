const express = require("express");

const router = express.Router();

const {

getLoginHistory

} = require("../controllers/loginHistoryController");

router.get("/:id", getLoginHistory);

module.exports = router;