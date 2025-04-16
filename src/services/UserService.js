const { Content, Program, Image, User, Class } = require('../models')

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

const getUserClasses = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Class,
        include: [Program]
      }
    ]
  })
  return user.Classes
}

const checkUser = async (user_id, role) => {
  const user = await User.findOne({
    where: {
      user_id,
      role
    }
  })
  return user
}

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  deleteUserById,
  getUserClasses,
  checkUser
}
