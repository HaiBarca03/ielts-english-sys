const express = require('express')
const router = express.Router()
const {
  monthlyRevenue,
  monthlyRevenueDetails
} = require('../controllers/PaymentController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.get('/monthly-revenue', authorizeAdmin, monthlyRevenue)
router.get('/daily-revenue', authorizeAdmin, monthlyRevenueDetails)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Statistical
 *   description: API for managing Revenue
 */

/**
 * @swagger
 * /statistical/monthly-revenue:
 *   get:
 *     summary: Get all revenue with pagination
 *     tags: [Statistical]
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
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of all revenue
 */

/**
 * @swagger
 * /statistical/daily-revenue:
 *   get:
 *     summary: Get all day revenue with pagination
 *     tags: [Statistical]
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
 *         name: date
 *         required: false
 *         description: The date to filter by (in YYYY-MM-DD format).
 *         schema:
 *           type: string
 *       - in: query
 *         name: program_id
 *         required: false
 *         description: The ID of the class to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         required: false
 *         description: The ID of the class to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by payment status (Paid, Unpaid)
 *         schema:
 *           type: string
 *           enum: [Paid, Unpaid]
 *     responses:
 *       200:
 *         description: Paginated list of all revenue
 */
