const { User, Role } = require("../models");

// CREATE USER
const createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully.",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL USERS
const getAllUsers = async (req, res) => {

    try {

        const users = await User.findAll({
            include: Role
        });

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// READ USER BY ID
const getUserById = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id, {
            include: Role
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE USER
const updateUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await user.update(req.body);

        res.status(200).json({
            message: "User updated successfully.",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE USER
const deleteUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "User deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};