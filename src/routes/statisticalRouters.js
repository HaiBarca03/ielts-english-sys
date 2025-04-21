const express = require('express')
const router = express.Router()
const { monthlyRevenue } = require('../controllers/PaymentController')
const { authorizeAdmin, authorizeUser } = require('../middlewares/auth')

router.get('/monthlyRevenue', monthlyRevenue)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Statistical
 *   description: API for managing Revenue
 */

/**
 * @swagger
 * /statistical/monthlyRevenue:
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
