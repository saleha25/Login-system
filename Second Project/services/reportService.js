const fs = require("fs");
const path = require("path");

async function generateReport(reportName) {

    const report = `
=========================
REPORT
=========================

Report Name : ${reportName}

Generated At : ${new Date()}

Status : Success
`;

    const reportsFolder = path.join(__dirname, "../reports");

    if (!fs.existsSync(reportsFolder)) {
        fs.mkdirSync(reportsFolder);
    }

    fs.writeFileSync(
        path.join(reportsFolder, `${reportName}.txt`),
        report
    );

    console.log("Report Generated Successfully");
}

module.exports = { generateReport };