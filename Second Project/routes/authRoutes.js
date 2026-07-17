
const upload = require("../middleware/uploadMiddleware");
const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");
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
router.get("/profile", authMiddleware, getUserProfile);
module.exports = router;