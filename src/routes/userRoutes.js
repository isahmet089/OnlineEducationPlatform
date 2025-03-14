const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");
// admin panel
router.get("/",verifyUser,authorize(ROLES.ADMIN),userController.userGet);
router.post("/",verifyUser,authorize(ROLES.ADMIN),userController.userCreate);
router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.USER),userController.userUpdate);
router.delete("/:id",verifyUser, authorize(ROLES.ADMIN),userController.userDelete); 

module.exports= router; 