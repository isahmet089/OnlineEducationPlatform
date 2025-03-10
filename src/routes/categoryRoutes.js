const express =require("express");
const router =express.Router()
const {getCategory,deleteCategory,updateCategory,addCategory} =require("../controller/categoryController");
const {verifyUser,authorize}=require("../middleware/auth");


router.get("/",getCategory);
router.post("/",verifyUser,addCategory);
router.delete("/:id",verifyUser,authorize('instructor', 'admin'),deleteCategory);
router.put("/:id",verifyUser,updateCategory)


module.exports=router;