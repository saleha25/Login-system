const reportQueue = require("../queues/reportQueue");

const generateReport = async (req, res) => {

    const { reportName } = req.body;

    if (!reportName) {
        return res.status(400).json({
            message: "Report name is required."
        });
    }

   await reportQueue.add(
    "generate-report",
    {
        reportName,
    },
    {
        attempts: 3,
        backoff: {
            type: "fixed",
            delay: 3000,
        },
    }
);
    res.status(200).json({
        message: "Report generation started.",
        status: "Queued"
    });

};

module.exports = { generateReport };