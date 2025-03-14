const express = require("express");
const router =express.Router();
const lessonContoller =require("../controller/lessonController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");

router.get("/",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.getLesson);
router.post("/",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.addLesson);
router.delete("/:id",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.deleteLesson);
router.put("/:id",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.updateLesson);



module.exports=router;