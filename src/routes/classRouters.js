const express = require('express')
const router = express.Router()
const {
  createClass,
  getClassesByProgram,
  getClassInfo,
  getAllClasses,
  updateClass,
  deleteClass,
  addUserToClass,
  deleteUserFromClass,
  getStudentCount
} = require('../controllers/ClassController')
const {
  authorizeAdmin,
  authorizeAdminTeacher,
  authorizeUser
} = require('../middlewares/auth')

router.post('/', authorizeAdmin, createClass)
router.get('/', authorizeAdmin, getAllClasses)
router.get(
  '/count-student-class/:class_id',
  authorizeAdminTeacher,
  getStudentCount
)
router.get('/program/:program_id', authorizeAdminTeacher, getClassesByProgram)
router.get('/:class_id', getClassInfo)
router.put('/:id', authorizeAdmin, updateClass)
router.delete('/:id', authorizeAdmin, deleteClass)
router.post('/add-user', authorizeAdmin, addUserToClass)
router.delete('/:classId/user/:userId', authorizeAdmin, deleteUserFromClass)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: API for managing class
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all class with pagination
 *     tags: [Class]
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
 *         description: Paginated list of all contents
 */

/**
 * @swagger
 * /class/{class_id}:
 *   get:
 *     summary: Get a class info
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: A single content
 */

/**
 * @swagger
 * /class/count-student-class/{class_id}:
 *   get:
 *     summary: Count student a class
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: A single content
 */

/**
 * @swagger
 * /class/program/{program_id}:
 *   get:
 *     summary: Get a class by program
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: program_id
 *         required: true
 *         description: program ID
 *     responses:
 *       200:
 *         description: A single content
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassCreate'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /class/add-user:
 *   post:
 *     summary: Create class user
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassUserCreate'
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     summary: Update class
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassUpdate'
 *     responses:
 *       201:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 */

/**
 * @swagger
 * /class/{classId}/user/{userId}:
 *   delete:
 *     summary: Delete user from class
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User from class deleted successfully
 */
