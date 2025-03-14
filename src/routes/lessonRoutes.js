const express = require("express");
const router =express.Router();
const lessonContoller =require("../controller/lessonController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");
/**
 * @swagger
 * /api/lesson  :
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "BÜTÜN DERSLER : "
 *                 lessons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Server error
 */
router.get("/", verifyUser, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), lessonContoller.getLesson);
/**
 * @swagger
 * /api/lesson/slug/{slug}:
 *   get:
 *     summary: Get lesson by slug
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug of the lesson
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The lesson matching the slug
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seçili Kurs : "
 *                 lessons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Server error
 */
router.get("/slug/:slug",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN,ROLES.STUDENT),lessonContoller.getLessonSlug);
/**
 * @swagger
 * /api/lesson:
 *   post:
 *     summary: Add a new lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ders başarıyla eklendi!"
 *                 newLesson:
 *                   $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Server error
 */
router.post("/",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.addLesson);
/**
 * @swagger
 * /api/lesson/{id}:
 *   delete:
 *     summary: Delete a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ders başarıyla silindi!"
 *                 deletedLesson:
 *                   $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.deleteLesson);
/**
 * @swagger
 * /api/lesson/{id}:
 *   put:
 *     summary: Update a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson to update
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
 *               content:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ders başarıyla güncellendi!"
 *                 updatedLesson:
 *                   $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */
router.put("/:id",verifyUser,authorize(ROLES.INSTRUCTOR,ROLES.ADMIN),lessonContoller.updateLesson);



module.exports=router;