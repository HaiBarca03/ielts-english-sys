const express = require('express')
const router = express.Router()
const {
  createAttendance,
  getAttendancesByClass,
  getAttendancesByUser,
  updateAttendance,
  deleteAttendance
} = require('../controllers/AttendanceController')

router.post('/', createAttendance)
router.get('/class/:class_id', getAttendancesByClass)
router.get('/user/:user_id', getAttendancesByUser)
router.put('/:attendance_id', updateAttendance)
router.delete('/:attendance_id', deleteAttendance)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API for managing Attendance
 */

/**
 * @swagger
 * /attendance/class/{class_id}:
 *   get:
 *     summary: Get all attendance by class with pagination
 *     tags: [Attendance]
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
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: class ID
 *       - in: query
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of all contents
 */

/**
 * @swagger
 * /attendance/user/{user_id}:
 *   get:
 *     summary: Get all attendance by user with pagination
 *     tags: [Attendance]
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
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: user ID
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by attendance status (Present, Absent, Excused)
 *         schema:
 *           type: string
 *           enum: [Present, Absent, Excused]
 *       - in: query
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of all contents
 */

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Create content
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceCreate'
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /attendance/{attendance_id}:
 *   put:
 *     summary: Update Attendance
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: attendance_id
 *         required: true
 *         description: Attendance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceUpdate'
 *     responses:
 *       201:
 *         description: Attendance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /attendance/{attendance_id}:
 *   delete:
 *     summary: Delete Attendance by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: attendance_id
 *         required: true
 *         description: Attendance ID
 *     responses:
 *       200:
 *         description: Attendance deleted successfully
 */
