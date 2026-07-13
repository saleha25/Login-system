const { Permission } = require("../models");

// CREATE
const createPermission = async (req, res) => {
    try {
        const permission = await Permission.create(req.body);

        res.status(201).json({
            message: "Permission created successfully.",
            permission
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ ALL
const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();

        res.status(200).json({
            message: "All Permissions",
            permissions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ BY ID
const getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);

        if (!permission) {
            return res.status(404).json({
                message: "Permission not found."
            });
        }

        res.status(200).json(permission);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE
const updatePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);

        if (!permission) {
            return res.status(404).json({
                message: "Permission not found."
            });
        }

        await permission.update(req.body);

        res.status(200).json({
            message: "Permission updated successfully.",
            permission
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE
const deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);

        if (!permission) {
            return res.status(404).json({
                message: "Permission not found."
            });
        }

        await permission.destroy();

        res.status(200).json({
            message: "Permission deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
};