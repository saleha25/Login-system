const express=require("express");

const router=express.Router();

const{

getInactiveUsers

}=require("../controllers/inactiveUsersController");

router.get("/",getInactiveUsers);

module.exports=router;