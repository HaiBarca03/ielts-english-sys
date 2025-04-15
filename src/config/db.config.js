const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 10000
    },
    dialectModule: require('mysql2')
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connection successful!')
  })
  .catch((err) => {
    console.error('❌ Unable to connect to database:', err)
  })

module.exports = sequelize
