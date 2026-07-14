const express = require("express");
const router = express.Router();

const {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    updateRolePermission,
    deleteRolePermission
} = require("../controllers/rolePermissionController");

router.post("/", createRolePermission);

router.get("/", getAllRolePermissions);

router.get("/:id", getRolePermissionById);

router.put("/:id", updateRolePermission);

router.delete("/:id", deleteRolePermission);

module.exports = router;