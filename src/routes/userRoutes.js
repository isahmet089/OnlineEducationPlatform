const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");

router.get("/",userController.userGet);
router.post("/",userController.userCreate);

module.exports= router;