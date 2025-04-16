const express = require('express')
const router = express.Router()
const {
  createSchedule,
  getSchedules
} = require('../controllers/ScheduleController')

router.post('/', createSchedule)
router.get('/', getSchedules)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API for managing schedule
 */

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Get all schedule with pagination
 *     tags: [Schedules]
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
 *       - in: query
 *         name: class_id
 *         required: false
 *         description: The ID of the class to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: teacher_id
 *         required: false
 *         description: The ID of the teacher to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of all schedule
 */

/**
 * @swagger
 * /schedule:
 *   post:
 *     summary: Create schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleCreate'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Bad request
 */
