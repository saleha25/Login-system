const express = require("express");

const router = express.Router();

const {

getPermissionAudit

}=require("../controllers/permissionAuditController");

router.get("/",getPermissionAudit);

module.exports=router;