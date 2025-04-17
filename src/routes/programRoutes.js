const express = require('express')
const router = express.Router()
const {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
} = require('../controllers/ProgramController')
const { authorizeAdmin } = require('../middlewares/auth')

router.get('/', getAllPrograms)
router.get('/:id', getProgramById)
router.post('/', authorizeAdmin, createProgram)
router.put('/:id', authorizeAdmin, updateProgram)
router.delete('/:id', authorizeAdmin, deleteProgram)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: API for managing programs
 */

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get all programs with pagination
 *     tags: [Programs]
 *     parameters:
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
 *         description: Paginated list of programs
 */

/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     summary: Get a program by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Program ID
 *     responses:
 *       200:
 *         description: A single program
 */

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramCreate'
 *     responses:
 *       201:
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /programs/{id}:
 *   put:
 *     summary: Update program
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramUpdate'
 *     responses:
 *       200:
 *         description: Program updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /programs/{id}:
 *   delete:
 *     summary: Delete a program by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     responses:
 *       200:
 *         description: Program deleted successfully
 */
