const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.get("/",reviewController.getReview)
router.post("/",reviewController.addReview);
router.delete("/",reviewController.deleteReview);
router.put("/",reviewController.updateReview);



module.exports= router;