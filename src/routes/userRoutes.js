const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");
const { authorize,verifyUser } = require('../middleware/auth');
// admin panel
router.get("/",verifyUser,authorize('admin'),userController.userGet);
router.post("/",verifyUser,authorize('admin'),userController.userCreate);
router.put("/:id",verifyUser,authorize('admin'),userController.userUpdate);
router.delete("/:id",verifyUser, authorize('admin'),userController.userDelete); 

module.exports= router; 