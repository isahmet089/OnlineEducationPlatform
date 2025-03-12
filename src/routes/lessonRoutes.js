const express = require("express");
const router =express.Router();
const lessonContoller =require("../controller/lessonController");

router.post("/",lessonContoller.addLesson);
router.get("/",lessonContoller.getLesson);
router.delete("/:id",lessonContoller.deleteLesson);
router.put("/:id",lessonContoller.updateLesson);



module.exports=router;