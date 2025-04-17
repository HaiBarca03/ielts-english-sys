const express = require('express')
const router = express.Router()
const { createScore, updateScore } = require('../controllers/ScoreController')

router.post('/', createScore)
router.put('/:score_id', updateScore)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Scores
 *   description: API for managing score
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
