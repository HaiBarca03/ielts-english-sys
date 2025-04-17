const { Op } = require('sequelize')
const { Schedule, Class, User } = require('../models')

const createSchedule = async (scheduleData) => {
  return await Schedule.create(scheduleData)
}

const getAllSchedules = async (classId, teacherId, date, page, limit) => {
  const where = {}
  if (classId) where.class_id = classId
  if (teacherId) where.teacher_id = teacherId
  if (date) where.date = date

  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  const offset = (page - 1) * limit

  const { count, rows } = await Schedule.findAndCountAll({
    where,
    offset,
    limit,
    include: [{ model: Class }, { model: User, as: 'Teacher' }],
    order: [
      ['date', 'ASC'],
      ['start_time', 'ASC']
    ]
  })

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getSchedulesByUserId = async (userId, page, limit, date) => {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  const offset = (page - 1) * limit

  const classUsers = await Class.findAll({
    include: {
      model: User,
      where: { user_id: userId },
      through: { attributes: [] },
      attributes: []
    },
    attributes: ['class_id']
  })
  const classIds = classUsers.map((c) => c.class_id)

  const where = {
    [Op.or]: [{ teacher_id: userId }, { class_id: { [Op.in]: classIds } }]
  }

  if (date) {
    where.date = date
  }

  const { count, rows } = await Schedule.findAndCountAll({
    where,
    offset,
    limit,
    include: [{ model: Class }, { model: User, as: 'Teacher' }],
    order: [
      ['date', 'ASC'],
      ['start_time', 'ASC']
    ]
  })

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getScheduleDetail = async (scheduleId) => {
  return await Schedule.findOne({
    where: { schedule_id: scheduleId },
    include: [{ model: Class }, { model: User, as: 'Teacher' }]
  })
}

const updateSchedule = async (scheduleId, data) => {
  const schedule = await Schedule.findByPk(scheduleId)

  if (!schedule) return null

  await schedule.update(data)

  return schedule
}

const deleteSchedule = async (scheduleId) => {
  const deletedCount = await Schedule.destroy({
    where: { schedule_id: scheduleId }
  })

  return deletedCount > 0
}

module.exports = {
  createSchedule,
  getAllSchedules,
  getSchedulesByUserId,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule
}
