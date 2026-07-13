
const upload = require("../middleware/uploadMiddleware");
const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
    validateRegister,
    validate
} = require("../middleware/validationMiddleware");

router.post(
    "/register",
    upload.single("license"),
    validateRegister,
    validate,
    registerUser
);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
module.exports = router;