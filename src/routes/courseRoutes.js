const express =require("express");
const router =express.Router();
const courseController =require("../controller/courseController");

router.get("/",courseController.getCourse);
router.post("/:id",courseController.addCourse);
router.delete("/:id",courseController.deleteCourse);
router.put("/:id",courseController.updateCourse);

module.exports= router;