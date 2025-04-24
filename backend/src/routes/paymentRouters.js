const express = require('express')
const router = express.Router()
const {
  createPayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByProgram,
  getPaymentById,
  updatePayment,
  deletePayment
} = require('../controllers/PaymentController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.post('/', authorizeAdmin, createPayment)
router.get('/', authorizeAdmin, getAllPayments)
router.get('/user/:userId', authorizeAdmin, getPaymentsByUser)
router.get('/program/:programId', authorizeAdmin, getPaymentsByProgram)
router.get('/:paymentId', authorizeAdmin, getPaymentById)
router.put('/:paymentId', authorizeAdmin, updatePayment)
router.delete('/:paymentId', authorizeAdmin, deletePayment)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: API for managing Payment
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   delete:
 *     summary: delete payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: payment not found
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   get:
 *     summary: Get payment detail by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: payment detail
 *       404:
 *         description: payment not found
 */

/**
 * @swagger
 * /payment/{paymentId}:
 *   put:
 *     summary: Update payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: payment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentUpdate'
 *     responses:
 *       201:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /payment/program/{programId}:
 *   get:
 *     summary: Get all payment with pagination
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         description: ID of the program
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by payment status (Paid, Unpaid)
 *         schema:
 *           type: string
 *           enum: [Paid, Unpaid]
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
 *         description: Paginated list of all payment
 */

/**
 * @swagger
 * /payment/user/{userId}:
 *   get:
 *     summary: Get all payment with pagination
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by payment status (Paid, Unpaid)
 *         schema:
 *           type: string
 *           enum: [Paid, Unpaid]
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
 *         description: Paginated list of all payment
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payment with pagination
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by payment status (Paid, Unpaid)
 *         schema:
 *           type: string
 *           enum: [Paid, Unpaid]
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
 *         description: Paginated list of all payment
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCreate'
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
