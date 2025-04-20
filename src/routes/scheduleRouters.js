const express = require('express')
const router = express.Router()
const {
  createSchedule,
  getSchedules,
  getSchedulesByUser,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  getScheduleByClass,
  deleteSchedulesByClass
} = require('../controllers/ScheduleController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createSchedule)
router.get('/', authorizeAdmin, getSchedules)
router.get('/class/:class_id', authorizeUser, getScheduleByClass)
router.get('/user/:user_id', authorizeUser, getSchedulesByUser)
router.get('/:id', authorizeUser, getScheduleDetail)
router.put('/:id', authorizeAdmin, updateSchedule)
router.delete('/class/:class_id', authorizeAdmin, deleteSchedulesByClass)
router.delete('/', authorizeAdmin, deleteSchedule)

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
 * /schedule:
 *   delete:
 *     summary: Delete one or multiple schedules by ID
 *     description: Delete a single schedule or multiple schedules by providing one or more schedule IDs.
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule_id:
 *                 oneOf:
 *                   - type: string
 *                     description: Single schedule ID to delete
 *                   - type: array
 *                     items:
 *                       type: string
 *                     description: List of schedule IDs to delete
 *             example:
 *               schedule_id: ["a1b2c3d4-e5f6-7890-abcd-1234567890ef"]
 *     responses:
 *       200:
 *         description: Schedules deleted successfully
 *       400:
 *         description: No schedule IDs provided
 *       404:
 *         description: No schedules found or deleted
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /schedule/class/{class_id}:
 *   delete:
 *     summary: Delete a schedule by class ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: The class ID of the schedule to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */
