const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");
const {refreshAccessToken} =require("../controller/authController");
const { authorize } = require('../middleware/auth');
router.get("/",refreshAccessToken,userController.userGet);
router.post("/",refreshAccessToken,userController.userCreate);
router.put("/:id",refreshAccessToken,userController.userUpdate);
router.delete("/:id",refreshAccessToken, authorize('instructor', 'admin'),userController.userDelete);

module.exports= router;