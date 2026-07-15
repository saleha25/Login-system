const express = require("express");

const router = express.Router();

const {

getUserDetails

} = require("../controllers/userDetailsController");

router.get("/:id", getUserDetails);

module.exports = router;