const express = require('express')
const router = express.Router()
const {
  createSchedule,
  getSchedules,
  getSchedulesByUser,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  getScheduleByClass
} = require('../controllers/ScheduleController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createSchedule)
router.get('/', authorizeAdmin, getSchedules)
router.get('/class/:class_id', authorizeUser, getScheduleByClass)
router.get('/user/:user_id', authorizeUser, getSchedulesByUser)
router.get('/:id', authorizeUser, getScheduleDetail)
router.put('/:id', authorizeAdmin, updateSchedule)
router.delete('/:schedule_id', authorizeAdmin, deleteSchedule)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API for managing schedule
 */

/**
 * @swagger
 * /schedule/{id}:
 *   get:
 *     summary: Get schedule detail by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Schedule ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Schedule detail
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /schedule/{id}:
 *   put:
 *     summary: Update schedule
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Schedule ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleUpdate'
 *     responses:
 *       201:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /schedule/class/{class_id}:
 *   get:
 *     summary: Get schedule by class with pagination
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

/**
 * @swagger
 * /schedule/user/{user_id}:
 *   get:
 *     summary: Get schedules for a user (as student or teacher)
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: user ID
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
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of schedules for the user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /schedule/{schedule_id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         description: The ID of the schedule to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */
