const PDFDocument = require("pdfkit");
const { readUsers } = require("../utils/excelHelper");

const getAllUsers = (req, res) => {
    const users = readUsers();

    res.status(200).json({
        message: "All registered users.",
        users
    });
};

const exportUsersPDF = (req, res) => {
    const users = readUsers();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=RegisteredUsers.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Registered Users", {
        align: "center"
    });

    doc.moveDown();

    users.forEach((user, index) => {
        doc.fontSize(12).text(`User ${index + 1}`);
        doc.text(`ID: ${user.id}`);
        doc.text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Role: ${user.role}`);
        doc.text(`Gender: ${user.gender}`);
        doc.text(`DOB: ${user.dob}`);
        doc.text(`Found Us: ${user.howDidYouFindUs}`);
        doc.text(`License: ${user.license}`);
        doc.moveDown();
    });

    doc.end();
};

module.exports = {
    getAllUsers,
    exportUsersPDF
};