const ScheduleService = require('../services/ScheduleService')
const ClassService = require('../services/ClassService')
const UserService = require('../services/UserService')
const { Schedule } = require('../models')

const createSchedule = async (req, res) => {
  try {
    const { class_id, teacher_id, room, type } = req.body
    const role = 'Teacher'

    if (!class_id || !teacher_id || !type) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const classInfo = await ClassService.getClassInfo(class_id)
    if (!classInfo) {
      return res.status(404).json({ message: 'Class not found' })
    }
    const { start_date, end_date } = classInfo

    const teacher = await UserService.checkUser(teacher_id, role)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    const conflict = await ScheduleService.checkScheduleConflict({
      type,
      start_date,
      end_date,
      room
    })
    if (conflict) {
      return res.status(400).json({
        message:
          'Schedule conflict detected in room for this type and date range'
      })
    }

    const schedules = generateSchedules(type, start_date, end_date, {
      class_id,
      teacher_id,
      room
    })

    const created = await Schedule.bulkCreate(schedules)

    return res.status(201).json({
      message: 'Schedules created successfully',
      count: created.length,
      schedules: created
    })
  } catch (error) {
    console.error('Error creating schedules:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const generateSchedules = (type, startDateStr, endDateStr, commonFields) => {
  const daysMap = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6
  }

  const sessionTimes = {
    s: { start_time: '09:00:00', end_time: '11:00:00' },
    c: { start_time: '14:00:00', end_time: '16:00:00' },
    t: { start_time: '18:00:00', end_time: '20:00:00' }
  }

  const sessionPart = type.split('-').pop()
  const daysPart = type.replace(`-${sessionPart}`, '')

  const days = daysPart.split('-').map((d) => daysMap[d])
  const sessionTime = sessionTimes[sessionPart]

  if (!sessionTime) {
    throw new Error(`Invalid session type: ${sessionPart}`)
  }

  const { start_time, end_time } = sessionTime

  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const schedules = []

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (days.includes(date.getDay())) {
      const formattedDate = date.toISOString().split('T')[0]
      schedules.push({
        ...commonFields,
        date: formattedDate,
        start_time,
        end_time
      })
    }
  }

  return schedules
}

const getSchedules = async (req, res) => {
  try {
    const { class_id, teacher_id, date, page, limit } = req.query

    const schedules = await ScheduleService.getAllSchedules(
      class_id,
      teacher_id,
      date,
      page,
      limit
    )

    return res.status(200).json({
      message: 'Schedules retrieved successfully',
      schedules
    })
  } catch (error) {
    console.error('Error retrieving schedules:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getSchedulesByUser = async (req, res) => {
  try {
    const { page, limit, date } = req.query
    const { user_id } = req.params

    const schedules = await ScheduleService.getSchedulesByUserId(
      user_id,
      page,
      limit,
      date
    )

    return res.status(200).json({
      message: 'Schedules for user retrieved successfully',
      schedules
    })
  } catch (error) {
    console.error('Error retrieving user schedules:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getScheduleDetail = async (req, res) => {
  try {
    const { id } = req.params

    const schedule = await ScheduleService.getScheduleDetail(id)

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json({
      message: 'Schedule retrieved successfully',
      schedule
    })
  } catch (error) {
    console.error('Error retrieving schedule detail:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const updated = await ScheduleService.updateSchedule(id, data)

    if (!updated) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json({
      message: 'Schedule updated successfully',
      schedule: updated
    })
  } catch (error) {
    console.error('Error updating schedule:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteSchedule = async (req, res) => {
  try {
    const { schedule_id } = req.params

    const success = await ScheduleService.deleteSchedule(schedule_id)

    if (!success) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    console.error('Error deleting schedule:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getScheduleByClass = async (req, res) => {
  try {
    const { class_id, date, page, limit } = req.query

    const schedules = await ScheduleService.getSchedulesByClass(
      class_id,
      date,
      page,
      limit
    )

    return res.status(200).json({
      message: 'Schedules retrieved successfully',
      schedules
    })
  } catch (error) {
    console.error('Error retrieving schedules:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  createSchedule,
  getSchedules,
  getSchedulesByUser,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  getScheduleByClass
}
