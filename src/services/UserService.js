const { Content, Program, Image, User } = require('../models')

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

const createUser = async (userData) => {
  return await User.create(userData)
}

module.exports = {
  findUserByEmail,
  createUser
}
