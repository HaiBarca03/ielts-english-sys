const express = require('express')
const router = express.Router()
const {
  createScore,
  updateScore,
  getScoreByUser,
  getScoresByClass,
  deleteScoreById
} = require('../controllers/ScoreController')
const { authorizeAdminTeacher, authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeAdminTeacher, createScore)
router.put('/:score_id', authorizeAdminTeacher, updateScore)
router.get('/user/:user_id', authorizeUser, getScoreByUser)
router.get('/class/:class_id', authorizeAdminTeacher, getScoresByClass)
router.delete('/:score_id', authorizeAdminTeacher, deleteScoreById)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Scores
 *   description: API for managing score
 */

/**
 * @swagger
 * /score/{score_id}:
 *   delete:
 *     summary: Delete score by ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: score_id
 *         required: true
 *         description: score ID
 *     responses:
 *       200:
 *         description: score deleted successfully
 */

/**
 * @swagger
 * /score/class/{class_id}:
 *   get:
 *     summary: Get score by class ID with optional type filter and pagination
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filter by content type (Lesson, Test, Practice)
 *         schema:
 *           type: string
 *           enum: [Lesson, Test, Practice]
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of contents by program
 */

/**
 * @swagger
 * /score/user/{user_id}:
 *   get:
 *     summary: Get score by user ID with optional type filter and pagination
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filter by content type (Lesson, Test, Practice)
 *         schema:
 *           type: string
 *           enum: [Lesson, Test, Practice]
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of contents by program
 */

/**
 * @swagger
 * /score:
 *   post:
 *     summary: Create score
 *     tags: [Scores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScoreCreate'
 *     responses:
 *       201:
 *         description: Score created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /score/{score_id}:
 *   put:
 *     summary: Update score
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: score_id
 *         required: true
 *         description: Score ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScoreUpdate'
 *     responses:
 *       201:
 *         description: Score updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       400:
 *         description: Bad request
 */
