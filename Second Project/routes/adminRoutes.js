const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    getAllUsers,
    exportUsersPDF
} = require("../controllers/adminController");

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("Admin"),
    getAllUsers
);

router.get(
    "/export",
    authMiddleware,
    roleMiddleware("Admin"),
    exportUsersPDF
);

module.exports = router;