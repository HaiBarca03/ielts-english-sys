const express = require('express')

const app = express()
app.use(express.json())

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Applications running on the gateway http://localhost:${PORT}`)
})
module.exports = app
