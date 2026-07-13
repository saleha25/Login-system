const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../src/database/users.xlsx");

// Read users from Excel
const readUsers = () => {

    if (!fs.existsSync(filePath)) {
        return [];
    }

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
        return [];
    }

    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

// Write users to Excel
const writeUsers = (users) => {

    const worksheet = XLSX.utils.json_to_sheet(users);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, filePath);
};

module.exports = {
    readUsers,
    writeUsers
};