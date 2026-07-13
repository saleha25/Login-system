const { Session } = require("../models");

// CREATE
const createSession = async (req, res) => {
    try {
        const session = await Session.create(req.body);

        res.status(201).json({
            message: "Session created successfully.",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL
const getAllSessions = async (req, res) => {
    try {

        const sessions = await Session.findAll();

        res.status(200).json({
            message: "All Sessions",
            sessions
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ BY ID
const getSessionById = async (req, res) => {
    try {

        const session = await Session.findByPk(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Session not found."
            });
        }

        res.status(200).json(session);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE
const updateSession = async (req, res) => {
    try {

        const session = await Session.findByPk(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Session not found."
            });
        }

        await session.update(req.body);

        res.status(200).json({
            message: "Session updated successfully.",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE
const deleteSession = async (req, res) => {
    try {

        const session = await Session.findByPk(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Session not found."
            });
        }

        await session.destroy();

        res.status(200).json({
            message: "Session deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
};