const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");

router.get("/",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.STUDENT),reviewController.getReview)
router.post("/",verifyUser,authorize(ROLES.STUDENT),reviewController.addReview);
router.delete("/",verifyUser,authorize(ROLES.ADMIN),reviewController.deleteReview);
router.put("/",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),reviewController.updateReview);



module.exports= router;