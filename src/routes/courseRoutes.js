const express =require("express");
const router =express.Router();
const courseController =require("../controller/courseController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");
/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve all courses from the system
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved courses
 *       500:
 *         description: Internal server error
 */

router.get("/",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.USER),courseController.getCourse);
/**
 * @swagger
 * /api/course/slug/{slug}:
 *   get:
 *     summary: Get course by slug
 *     description: Retrieve a course by its slug
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Course slug to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

router.get("/slug/:slug",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR,ROLES.USER),courseController.getCourseSlug);
/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Add a new course
 *     description: Create a new course in the system
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully added course
 *       500:
 *         description: Internal server error
 */

router.post("/",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),courseController.addCourse);
/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Remove a course from the system by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),courseController.deleteCourse);
/**
 * @swagger
 * /api/course/{id}:
 *   put:
 *     summary: Update a course
 *     description: Update the details of a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated course
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course not found
 */
router.put("/:id",verifyUser,authorize(ROLES.ADMIN,ROLES.INSTRUCTOR),courseController.updateCourse);

module.exports= router;