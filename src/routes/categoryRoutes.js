const express =require("express");
const router =express.Router()
const categoryController =require("../controller/categoryController");
const {verifyUser}=require("../middleware/auth");
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles")
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories from the system
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *       500:
 *         description: Internal server error
 */
router.get("/",verifyUser,categoryController.getCategory);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category
 *     description: Create a new category in the system
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category successfully added
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/",verifyUser,authorize(ROLES.ADMIN),categoryController.addCategory);
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Remove a category from the system by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */

router.delete("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),categoryController.deleteCategory);
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update the details of a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated category
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */

router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),categoryController.updateCategory)
/**
 * @swagger
 * /api/categories/{categorySlug}:
 *   get:
 *     summary: Get category by slug
 *     description: Retrieve a category by its slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categorySlug
 *         required: true
 *         description: Category slug to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved category
 *       404:
 *         description: Category not found
 */
router.get("/:categorySlug",verifyUser,categoryController.getCategory);


module.exports=router;