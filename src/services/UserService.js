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
          attributes: ['image_id', 'public_id', 'url']
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

const deleteUsersByIds = async (ids) => {
  const deleted = await User.destroy({
    where: {
      user_id: ids
    }
  })

  return deleted
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

const getUsersByRole = async (role) => {
  const whereClause = {}
  if (role) whereClause.role = role

  try {
    const users = await User.findAll({
      where: whereClause,
      include: [
        {
          model: Image,
          attributes: ['image_id', 'public_id', 'url']
        }
      ]
    })

    return users
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message)
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  deleteUsersByIds,
  getUserClasses,
  checkUser,
  getUsersByRole
}
