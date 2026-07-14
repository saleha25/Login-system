const { PasswordReset } = require("../models");

// CREATE
const createPasswordReset = async (req, res) => {
    try {

        const passwordReset = await PasswordReset.create(req.body);

        res.status(201).json({
            message: "Password reset created successfully.",
            passwordReset
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL
const getAllPasswordResets = async (req, res) => {
    try {

        const passwordResets = await PasswordReset.findAll();

        res.status(200).json({
            message: "All Password Resets",
            passwordResets
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ BY ID
const getPasswordResetById = async (req, res) => {
    try {

        const passwordReset = await PasswordReset.findByPk(req.params.id);

        if (!passwordReset) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        res.status(200).json(passwordReset);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE
const updatePasswordReset = async (req, res) => {
    try {

        const passwordReset = await PasswordReset.findByPk(req.params.id);

        if (!passwordReset) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        await passwordReset.update(req.body);

        res.status(200).json({
            message: "Updated successfully.",
            passwordReset
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE
const deletePasswordReset = async (req, res) => {
    try {

        const passwordReset = await PasswordReset.findByPk(req.params.id);

        if (!passwordReset) {
            return res.status(404).json({
                message: "Record not found."
            });
        }

        await passwordReset.destroy();

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
    createPasswordReset,
    getAllPasswordResets,
    getPasswordResetById,
    updatePasswordReset,
    deletePasswordReset
};