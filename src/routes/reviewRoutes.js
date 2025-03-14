const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const { verifyUser } = require('../middleware/auth');
const authorize = require("../middleware/roleAuth");
const ROLES =require("../constants/roles");

/**
 * @swagger
 * /api/review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List of reviews"
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 */
router.get("/", verifyUser, authorize(ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT), reviewController.getReview);

/**
 * @swagger
 * /api/review/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A review matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review details"
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyUser, authorize(ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT), reviewController.getReviewId);

/**
 * @swagger
 * /api/review:
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review added successfully"
 *                 newReview:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Course or user not found
 *       500:
 *         description: Server error
 */
router.post("/", verifyUser, authorize(ROLES.STUDENT), reviewController.addReview);

/**
 * @swagger
 * /api/review:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the review to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted"
 *                 deletedReview:
 *                   $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 */
router.delete("/", verifyUser, authorize(ROLES.ADMIN), reviewController.deleteReview);

/**
 * @swagger
 * /api/review:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               userId:
 *                 type: string
 *               reviewId:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review updated successfully"
 *                 updatedReview:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.put("/", verifyUser, authorize(ROLES.ADMIN, ROLES.INSTRUCTOR), reviewController.updateReview);

module.exports = router;



module.exports= router;