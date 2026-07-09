const bcrypt = require("bcryptjs");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../utils/encryption");
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword
        };
        users.push(newUser);
res.status(201).json({
    message: "User registered successfully.",
    user: {
        id: newUser.id,
        name: newUser.name,
        email: encrypt(newUser.email)
    }
});
    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password."
            });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful.",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
//  Profile
const getProfile = (req, res) => {

    res.status(200).json({
        message: "Welcome to your profile.",
        user: req.user
    });

};
module.exports = {
    registerUser,
    loginUser,
    getProfile
};