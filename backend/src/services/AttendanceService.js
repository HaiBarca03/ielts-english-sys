const { Attendance, Schedule, Class, User } = require('../models')

const createAttendance = async ({ schedule_id, user_id, status, date }) => {
  const newAttendance = await Attendance.create({
    schedule_id,
    user_id,
    status,
    date
  })

  return newAttendance
}

const getAttendancesByClassId = async (classId, page, limit, date) => {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  const offset = (page - 1) * limit

  const scheduleWhere = { class_id: classId }
  if (date) {
    scheduleWhere.date = date
  }
  const { count, rows } = await Attendance.findAndCountAll({
    include: [
      {
        model: Schedule,
        where: scheduleWhere
        // include: [{ model: Class }]
      },
      {
        model: User
      }
    ],
    offset,
    limit,
    order: [['date', 'DESC']]
  })

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getAttendancesByUserId = async (userId, page, limit, status, date) => {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  const offset = (page - 1) * limit

  const where = { user_id: userId }
  if (status) where.status = status
  if (date) where.date = date

  const { count, rows } = await Attendance.findAndCountAll({
    where,
    // include: [
    //   {
    //     model: Schedule,
    //     include: [{ model: Class }, { model: User, as: 'Teacher' }]
    //   }
    // ],
    offset,
    limit,
    order: [['date', 'DESC']]
  })

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const updateAttendance = async (attendanceId, updateData) => {
  const attendance = await Attendance.findByPk(attendanceId)

  if (!attendance) return null

  await attendance.update(updateData)

  return attendance
}

const checkAttendanceById = async (attendance_id) => {
  const attendance = await Attendance.findByPk(attendance_id)
  return attendance !== null
}

const deleteAttendanceById = async (attendance_id) => {
  const deleted = await Attendance.destroy({
    where: { attendance_id }
  })

  return deleted > 0
}

module.exports = {
  createAttendance,
  getAttendancesByClassId,
  getAttendancesByUserId,
  updateAttendance,
  checkAttendanceById,
  deleteAttendanceById
}
