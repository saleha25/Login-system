const express = require("express");

const router = express.Router();

const {
    getOrganizationDashboard
} = require("../controllers/dashboardController");

router.get("/:id",getOrganizationDashboard);

module.exports=router;