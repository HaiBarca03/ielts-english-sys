const express = require('express')
const {
  registerUser,
  loginUser,
  getUserById,
  getProfile,
  updateUser,
  deleteUser,
  getClassByUser,
  getContentForUser,
  getUserRoles
} = require('../controllers/UserController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')
const { uploadFiles } = require('../middlewares/uploadCloudinary')
const router = express.Router()

router.post('/register', authorizeAdmin, uploadFiles, registerUser)
router.post('/login', loginUser)
router.get('/profile', authorizeUser, getProfile)
router.get('/user-class/:userId', authorizeAdmin, getClassByUser)
router.get('/roles', getUserRoles)
router.put('/:id', authorizeUser, uploadFiles, updateUser)
router.get('/:id', getUserById)
router.delete('/:id', authorizeAdmin, deleteUser)
router.get('/:userId/content', getContentForUser)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing Users
 */

/**
 * @swagger
 * /account/roles:
 *   get:
 *     summary: Get role by user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Class by user
 */

/**
 * @swagger
 * /account/{userId}/content:
 *   get:
 *     summary: Get content class by user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *         name: type
 *         required: false
 *         description: Filter by content type (Lesson, Test, Practice)
 *         schema:
 *           type: string
 *           enum: [Lesson, Test, Practice]
 *     responses:
 *       200:
 *         description: Class by user
 */

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Create account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: login account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: Account login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /account/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       201:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /account/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user ID
 *     responses:
 *       200:
 *         description: user deleted successfully
 */

/**
 * @swagger
 * /account/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: A single user
 */

/**
 * @swagger
 * /account/profile:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A single user
 */

/**
 * @swagger
 * /account/user-class/{userId}:
 *   get:
 *     summary: Get class by user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user ID
 *     responses:
 *       200:
 *         description: Class by user
 */
