const { readUsers, writeUsers } = require("../utils/excelHelper");

const getUserProfile = (req, res) => {
    res.status(200).json({
        message: "User Profile",
        user: req.user
    });
};

const updateUserProfile = (req, res) => {
    const users = readUsers();

    const index = users.findIndex(user => user.id === req.user.id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    const {
        name,
        gender,
        dob,
        howDidYouFindUs
    } = req.body;

    if (name) users[index].name = name;
    if (gender) users[index].gender = gender;
    if (dob) users[index].dob = dob;
    if (howDidYouFindUs) users[index].howDidYouFindUs = howDidYouFindUs;

    writeUsers(users);

    res.status(200).json({
        message: "Profile updated successfully.",
        user: users[index]
    });
};

module.exports = {
    getUserProfile,
    updateUserProfile
};