const { RolePermission } = require("../models");

// CREATE
const createRolePermission = async (req, res) => {
    try {

        const rolePermission = await RolePermission.create(req.body);

        res.status(201).json({
            message: "Role Permission created successfully.",
            rolePermission
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL
const getAllRolePermissions = async (req, res) => {
    try {

        const rolePermissions = await RolePermission.findAll();

        res.status(200).json({
            message: "All Role Permissions",
            rolePermissions
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ BY ID
const getRolePermissionById = async (req, res) => {
    try {

        const rolePermission = await RolePermission.findByPk(req.params.id);

        if (!rolePermission) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        res.status(200).json(rolePermission);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE
const updateRolePermission = async (req, res) => {
    try {

        const rolePermission = await RolePermission.findByPk(req.params.id);

        if (!rolePermission) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        await rolePermission.update(req.body);

        res.status(200).json({
            message: "Updated successfully.",
            rolePermission
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE
const deleteRolePermission = async (req, res) => {
    try {

        const rolePermission = await RolePermission.findByPk(req.params.id);

        if (!rolePermission) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        await rolePermission.destroy();

        res.status(200).json({
            message: "Deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    updateRolePermission,
    deleteRolePermission
};