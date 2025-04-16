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

module.exports = {
  createSchedule,
  getAllSchedules
}
