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

const getSchedulesByClass = async (classId, date, page, limit) => {
  const where = {}
  if (classId) where.class_id = classId
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

const getDatesByType = (type, startDateStr, endDateStr) => {
  const daysMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 }
  const session = type.slice(-1) // s / c / t
  const days = type
    .slice(0, 5)
    .split('-')
    .map((d) => daysMap[d])

  const dates = []
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (days.includes(d.getDay())) {
      dates.push(new Date(d))
    }
  }

  return { session, dates }
}

const getTimeRangeBySession = (session) => {
  const timeMap = {
    s: { start_time: '07:00:00', end_time: '11:00:00' },
    c: { start_time: '13:00:00', end_time: '17:00:00' },
    t: { start_time: '18:00:00', end_time: '22:00:00' }
  }
  return timeMap[session]
}

const checkScheduleConflict = async ({ type, start_date, end_date, room }) => {
  const { session, dates } = getDatesByType(type, start_date, end_date)
  const { start_time, end_time } = getTimeRangeBySession(session)

  const dateList = dates.map((d) => d.toISOString().split('T')[0])

  const conflict = await Schedule.findOne({
    where: {
      room,
      date: { [Op.in]: dateList },
      [Op.or]: [
        {
          start_time: { [Op.between]: [start_time, end_time] }
        },
        {
          end_time: { [Op.between]: [start_time, end_time] }
        },
        {
          [Op.and]: [
            { start_time: { [Op.lte]: start_time } },
            { end_time: { [Op.gte]: end_time } }
          ]
        }
      ]
    }
  })

  return !!conflict
}

module.exports = {
  createSchedule,
  getAllSchedules,
  getSchedulesByUserId,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  checkScheduleConflict,
  getSchedulesByClass
}
