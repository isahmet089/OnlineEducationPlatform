const express =require("express");
const router =express.Router()
const categoryController =require("../controller/categoryController");
const {verifyUser}=require("../middleware/auth");
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles")

router.get("/",verifyUser,categoryController.getCategory);
router.post("/",verifyUser,authorize(ROLES.ADMIN),categoryController.addCategory);
router.delete("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),categoryController.deleteCategory);
router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),categoryController.updateCategory)

router.get("/:categorySlug",verifyUser,categoryController.getCategory);


module.exports=router;