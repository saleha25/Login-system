const express = require("express");
const router = express.Router();

const {
    createUserLog,
    getAllUserLogs,
    getUserLogById,
    updateUserLog,
    deleteUserLog
} = require("../controllers/userLogController");

router.post("/", createUserLog);
router.get("/", getAllUserLogs);
router.get("/:id", getUserLogById);
router.put("/:id", updateUserLog);
router.delete("/:id", deleteUserLog);

module.exports = router;