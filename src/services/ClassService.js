const { Op } = require('sequelize')
const { Class, Program, User } = require('../models')

const createClass = async (data) => {
  return await Class.create(data)
}

const getAllClasses = async (
  status,
  startDate,
  endDate,
  page = 1,
  limit = 10
) => {
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const options = {
    offset,
    limit: parseInt(limit),
    where: {},
    order: [['created_at', 'DESC']]
  }

  if (status) {
    options.where.status = status
  }

  if (startDate) {
    options.where.start_date = { [Op.gte]: startDate }
  }

  if (endDate) {
    options.where.end_date = { [Op.lte]: endDate }
  }

  const classes = await Class.findAll(options)

  const totalItems = await Class.count({
    where: options.where
  })

  const totalPages = Math.ceil(totalItems / parseInt(limit))

  return {
    classes,
    totalItems,
    totalPages
  }
}

const getClassesByProgramId = async (programId) => {
  const classes = await Class.findAll({
    where: { program_id: programId }
  })
  return classes
}

const getClassInfo = async (classId) => {
  const classInfo = await Class.findOne({
    where: { class_id: classId },
    include: [
      {
        model: Program
      },
      {
        model: User,
        attributes: [
          'user_id',
          'role',
          'name',
          'email',
          'phone',
          'gender',
          'dob',
          'address',
          'school'
        ],
        through: { attributes: [] }
      }
    ]
  })
  const studentCount =
    classInfo?.Users?.filter((user) => user.role === 'Student').length || 0

  return {
    ...classInfo.toJSON(),
    studentCount
  }
}

const countStudentsInClass = async (classId) => {
  const classInfo = await Class.findByPk(classId, {
    include: [
      {
        model: User,
        where: { role: 'Student' },
        attributes: ['user_id'],
        through: { attributes: [] }
      }
    ]
  })

  const count = classInfo?.Users?.length || 0

  return count
}

const updateClass = async (classId, updateData) => {
  const classToUpdate = await Class.findByPk(classId)
  await classToUpdate.update(updateData)
  return classToUpdate
}

const deleteClass = async (classId) => {
  const classToDelete = await Class.findByPk(classId)
  await classToDelete.destroy()
  return
}

const addUserToClass = async (classInstance, user) => {
  return await classInstance.addUser(user)
}

const removeUserFromClass = async (classInstance, userInstance) => {
  await classInstance.removeUser(userInstance)
  return true
}

const checkUserInClass = async (classId, userId) => {
  const classWithUser = await Class.findOne({
    where: { class_id: classId },
    include: {
      model: User,
      where: { user_id: userId },
      through: { attributes: [] },
      attributes: ['user_id']
    }
  })

  return classWithUser
}

module.exports = {
  createClass,
  getClassesByProgramId,
  getClassInfo,
  getAllClasses,
  updateClass,
  deleteClass,
  addUserToClass,
  removeUserFromClass,
  checkUserInClass,
  countStudentsInClass
}
