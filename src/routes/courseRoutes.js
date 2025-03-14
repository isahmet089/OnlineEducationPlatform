const express =require("express");
const router =express.Router();
const courseController =require("../controller/courseController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");

router.get("/",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.USER),courseController.getCourse);
router.post("/:id",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),courseController.addCourse);
router.delete("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),courseController.deleteCourse);
router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),courseController.updateCourse);

module.exports= router;