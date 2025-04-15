const express = require('express')
const router = express.Router()

const programRouter = require('../routes/programRoutes')
const contentRouter = require('../routes/contentRoutes')

router.use('/programs', programRouter)
router.use('/contents', contentRouter)

module.exports = router
