const express = require('express')
const router = express.Router()

const programRouter = require('../routes/programRoutes')
const contentRouter = require('../routes/contentRoutes')
const imageRouter = require('../routes/imageRouters')
const userRouter = require('../routes/userRouters')
const classRouter = require('../routes/classRouters')

router.use('/programs', programRouter)
router.use('/contents', contentRouter)
router.use('/images', imageRouter)
router.use('/account', userRouter)
router.use('/class', classRouter)

module.exports = router
