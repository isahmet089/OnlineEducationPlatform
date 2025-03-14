const express =require("express");
const router = express.Router();
const userController =require("../controller/userController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");
// admin panel

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users from the system
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       400:
 *         description: Bad request
 */
router.get("/",verifyUser,authorize(ROLES.ADMIN),userController.userGet);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the system
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Bad request
 */
router.post("/",verifyUser,authorize(ROLES.ADMIN),userController.userCreate);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Update details of a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.USER),userController.userUpdate);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Remove a user from the system
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 *       404:
 *         description: User not found
 */
router.delete("/:id",verifyUser, authorize(ROLES.ADMIN),userController.userDelete); 

module.exports= router; 