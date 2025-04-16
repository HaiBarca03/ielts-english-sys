const express = require('express')
const router = express.Router()

const programRouter = require('../routes/programRoutes')
const contentRouter = require('../routes/contentRoutes')
const imageRouter = require('../routes/imageRouters')
const userRouter = require('../routes/userRouters')

router.use('/programs', programRouter)
router.use('/contents', contentRouter)
router.use('/images', imageRouter)
router.use('/account', userRouter)

module.exports = router
