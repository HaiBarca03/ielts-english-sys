const sequelize = require('../config/db.config')
const User = require('./User')
const Program = require('./Program')
const Content = require('./Content')
const Image = require('./Images')

const db = {
  sequelize,
  User,
  Program,
  Content,
  Image
}

require('./associateModels')(db)

module.exports = db
