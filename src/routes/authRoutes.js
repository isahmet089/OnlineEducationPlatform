const express =require("express");
const router =express.Router();
const authController = require("../controller/authController.js");



router.post("/login",authController.login);
router.post("/register",authController.register);
router.post("/logout",authController.logout);
router.post("/refresh-token",authController.refreshAccessToken);

module.exports=router;  