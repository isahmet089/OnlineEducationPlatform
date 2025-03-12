const express = require("express");
const router =express.Router();
const lessonContoller =require("../controller/lessonController");

router.post("/",lessonContoller.addLesson);
router.get("/",lessonContoller.getLesson);
router.delete("/",lessonContoller.deleteLesson);


module.exports=router;