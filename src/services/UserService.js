const { Content, Program, Image, User } = require('../models')

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

const findUserById = async (user_id) => {
  try {
    return await User.findByPk(user_id, {
      include: [
        {
          model: Image,
          as: 'Images'
        }
      ]
    })
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching user')
  }
}

const updateUser = async (user_id, data) => {
  return await User.update(data, {
    where: { user_id }
  })
}

const createUser = async (userData) => {
  return await User.create(userData)
}

const deleteUserById = async (id) => {
  return await User.destroy({ where: { user_id: id } })
}

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  deleteUserById
}
