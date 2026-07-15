const express = require("express");

const router = express.Router();

const {

searchUsers

} = require("../controllers/userSearchController");

router.get("/", searchUsers);

module.exports = router;