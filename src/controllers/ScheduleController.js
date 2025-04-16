const ScheduleService = require('../services/ScheduleService')
const ClassService = require('../services/ClassService')
const UserService = require('../services/UserService')

const createSchedule = async (req, res) => {
  try {
    const { class_id, teacher_id, date, start_time, end_time, room } = req.body
    const role = 'Teacher'
    if (!class_id || !teacher_id || !date || !start_time || !end_time) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const checkClass = await ClassService.getClassInfo(class_id)
    if (!checkClass) {
      return res.status(404).json({ message: 'Class not found' })
    }
    const checkTeacher = await UserService.checkUser(teacher_id, role)
    if (!checkTeacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    const inputDate = new Date(date)
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    inputDate.setHours(0, 0, 0, 0)

    if (inputDate < today) {
      return res
        .status(400)
        .json({ message: 'Date must be today or in the future' })
    }

    const newSchedule = await ScheduleService.createSchedule({
      class_id,
      teacher_id,
      date,
      start_time,
      end_time,
      room
    })

    return res.status(201).json({
      message: 'Schedule created successfully',
      schedule: newSchedule
    })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
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

module.exports = {
  createSchedule,
  getSchedules
}
