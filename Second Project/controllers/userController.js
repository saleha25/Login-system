const { readUsers, writeUsers } = require("../utils/excelHelper");
const redis = require("../config/cache");
const getUserProfile = async (req, res) => {

    const cacheKey = `user:${req.user.id}`;

    // Check Redis first
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {

        console.log("Returning user from Redis Cache");

        return res.status(200).json({
            source: "Cache",
            user: JSON.parse(cachedUser)
        });

    }

    console.log("Fetching user from Excel");

    const users = readUsers();

    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    // Save in Redis for 60 seconds
    await redis.set(
        cacheKey,
        JSON.stringify(user),
        "EX",
        60
    );

    res.status(200).json({
        source: "Database",
        user
    });

};

const updateUserProfile = async (req, res) => {
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
    await redis.set(
    `user:${req.user.id}`,
    JSON.stringify(users[index]),
    "EX",
    60
);

    res.status(200).json({
        message: "Profile updated successfully.",
        user: users[index]
    });
};

module.exports = {
    getUserProfile,
    updateUserProfile
};