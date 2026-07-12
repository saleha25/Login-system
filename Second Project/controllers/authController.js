const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readUsers, writeUsers } = require("../utils/excelHelper");
const { encrypt } = require("../utils/encryption");

// Register User
const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            role,
            gender,
            dob,
            howDidYouFindUs
        } = req.body;

        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !role ||
            !gender ||
            !dob ||
            !howDidYouFindUs
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
const users = readUsers();

const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            role,
            gender,
            dob,
            howDidYouFindUs,
            license: req.file ? req.file.filename : null
        };

        users.push(newUser);
        writeUsers(users);

        // Encrypt email only in production
        const emailResponse =
            process.env.NODE_ENV === "production"
                ? encrypt(newUser.email)
                : newUser.email;

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: emailResponse,
                role: newUser.role,
                gender: newUser.gender,
                dob: newUser.dob,
                howDidYouFindUs: newUser.howDidYouFindUs,
                license: newUser.license
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

        const users = readUsers();

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
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
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

// Protected Profile
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