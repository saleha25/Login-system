const express = require("express");

const router = express.Router();

const {
    getDuplicateEmails
} = require("../controllers/duplicateEmailController");

router.get("/", getDuplicateEmails);

module.exports = router;