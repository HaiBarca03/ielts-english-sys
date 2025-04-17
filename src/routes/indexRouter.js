const express = require('express')
const router = express.Router()

const programRouter = require('../routes/programRoutes')
const contentRouter = require('../routes/contentRoutes')
const imageRouter = require('../routes/imageRouters')
const userRouter = require('../routes/userRouters')
const classRouter = require('../routes/classRouters')
const scheduleRouter = require('../routes/scheduleRouters')
const attendanceRouter = require('../routes/attendanceRouters')
const paymentRouter = require('../routes/paymentRouters')
const scoreRouter = require('../routes/scoreRouters')

router.use('/programs', programRouter)
router.use('/contents', contentRouter)
router.use('/images', imageRouter)
router.use('/account', userRouter)
router.use('/class', classRouter)
router.use('/schedule', scheduleRouter)
router.use('/attendance', attendanceRouter)
router.use('/payment', paymentRouter)
router.use('/score', scoreRouter)

module.exports = router
