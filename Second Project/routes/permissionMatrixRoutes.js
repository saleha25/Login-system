const express = require("express");
const router = express.Router();

const {
    getPermissionMatrix
} = require("../controllers/permissionMatrixController");

router.get("/", getPermissionMatrix);

module.exports = router;