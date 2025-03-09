const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");
const {refreshAccessToken} =require("../controller/authController");
const { protect, authorize } = require('../middleware/auth');
router.get("/",refreshAccessToken,userController.userGet);
router.post("/",refreshAccessToken,userController.userCreate);
router.put("/:id",refreshAccessToken,userController.userUpdate);
router.delete("/:id",refreshAccessToken,protect, authorize('instructor', 'admin'),userController.userDelete);

module.exports= router;