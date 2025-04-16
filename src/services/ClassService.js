const { Op } = require('sequelize')
const { Class, Program } = require('../models')

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
      }
    ]
  })
  return classInfo
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

module.exports = {
  createClass,
  getClassesByProgramId,
  getClassInfo,
  getAllClasses,
  updateClass,
  deleteClass,
  addUserToClass,
  removeUserFromClass
}
