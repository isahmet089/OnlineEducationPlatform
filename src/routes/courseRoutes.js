const express =require("express");
const router =express.Router();
const courseController =require("../controller/courseController");
const { authorize,verifyUser } = require('../middleware/auth');

router.get("/",courseController.getCourse);
router.post("/:id",verifyUser,authorize('instructor','admin'),courseController.addCourse);
router.delete("/:id",verifyUser,authorize('admin'),courseController.deleteCourse);
router.put("/:id",verifyUser,authorize('instructor','admin'),courseController.updateCourse);

module.exports= router;