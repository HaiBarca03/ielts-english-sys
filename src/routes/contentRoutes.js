/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: API for managing contents
 */

/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Get all contents
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: List of contents
 */

/**
 * @swagger
 * /contents/{id}:
 *   get:
 *     summary: Get a content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Content ID
 *     responses:
 *       200:
 *         description: A single content
 */

/**
 * @swagger
 * /contents:
 *   post:
 *     summary: Create content
 *     tags: [Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentCreate'
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /contents/{id}:
 *   put:
 *     summary: Update content
 *     tags: [Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentUpdate'
 *     responses:
 *       201:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /contents/{id}:
 *   delete:
 *     summary: Delete content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content deleted successfully
 */

/**
 * @swagger
 * /contents/program/{programId}:
 *   get:
 *     summary: Get contents by Program ID with optional type filter
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         description: ID of the Program
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filter by content type (Lesson, Test, Practice)
 *         schema:
 *           type: string
 *           enum: [Lesson, Test, Practice]
 *     responses:
 *       200:
 *         description: List of contents by program
 */

const express = require('express')
const router = express.Router()
const {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getContentsByProgram
} = require('../controllers/ContentController')

router.get('/', getAllContents)
router.get('/program/:programId', getContentsByProgram)
router.get('/:id', getContentById)
router.post('/', createContent)
router.put('/:id', updateContent)
router.delete('/:id', deleteContent)

module.exports = router
