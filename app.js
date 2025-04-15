const express = require('express')
const indexRouter = require('./src/routes/indexRouter')
const swaggerSetup = require('./src/config/swagger.config')

// app
const app = express()
app.use(express.json())

// env
const API_PREFIX = process.env.API_PREFIX || '/api'
const PORT = process.env.PORT || 5000

// Swagger UI route
swaggerSetup(app)

// endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})
app.use(API_PREFIX, indexRouter)

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

// start server
app.listen(PORT, () => {
  console.log(
    `Applications running on the gateway http://localhost:${PORT}${API_PREFIX}`
  )
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
})

module.exports = app
