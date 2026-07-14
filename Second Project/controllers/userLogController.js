const { UserLog } = require("../models");

// CREATE
const createUserLog = async (req, res) => {
    try {
        const userLog = await UserLog.create(req.body);

        res.status(201).json({
            message: "User log created successfully.",
            userLog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ ALL
const getAllUserLogs = async (req, res) => {
    try {
        const userLogs = await UserLog.findAll();

        res.status(200).json({
            message: "All User Logs",
            userLogs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ BY ID
const getUserLogById = async (req, res) => {
    try {
        const userLog = await UserLog.findByPk(req.params.id);

        if (!userLog) {
            return res.status(404).json({
                message: "User log not found."
            });
        }

        res.status(200).json(userLog);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE
const updateUserLog = async (req, res) => {
    try {
        const userLog = await UserLog.findByPk(req.params.id);

        if (!userLog) {
            return res.status(404).json({
                message: "User log not found."
            });
        }

        await userLog.update(req.body);

        res.status(200).json({
            message: "User log updated successfully.",
            userLog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE
const deleteUserLog = async (req, res) => {
    try {
        const userLog = await UserLog.findByPk(req.params.id);

        if (!userLog) {
            return res.status(404).json({
                message: "User log not found."
            });
        }

        await userLog.destroy();

        res.status(200).json({
            message: "User log deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createUserLog,
    getAllUserLogs,
    getUserLogById,
    updateUserLog,
    deleteUserLog
};