const sequelize = require('../config/db.config')
const User = require('./User')
const Program = require('./Program')
const Content = require('./Content')
const Image = require('./Images')
const Class = require('./Class')
const Schedule = require('./Schedule')
const Attendance = require('./Attendance')

const db = {
  sequelize,
  User,
  Program,
  Content,
  Image,
  Class,
  Schedule,
  Attendance
}

require('./associateModels')(db)

module.exports = db
