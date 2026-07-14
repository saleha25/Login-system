const express = require("express");
const router = express.Router();

const {
    createPasswordReset,
    getAllPasswordResets,
    getPasswordResetById,
    updatePasswordReset,
    deletePasswordReset
} = require("../controllers/passwordResetController");

router.post("/", createPasswordReset);

router.get("/", getAllPasswordResets);

router.get("/:id", getPasswordResetById);

router.put("/:id", updatePasswordReset);

router.delete("/:id", deletePasswordReset);

module.exports = router;