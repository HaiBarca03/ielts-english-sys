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

module.exports = {
  createSchedule,
  getSchedules,
  getSchedulesByUser,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule
}
