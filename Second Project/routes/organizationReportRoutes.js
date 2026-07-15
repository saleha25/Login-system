const express = require("express");

const router = express.Router();

const {

getOrganizationReport

}=require("../controllers/organizationReportController");

router.get("/",getOrganizationReport);

module.exports=router;