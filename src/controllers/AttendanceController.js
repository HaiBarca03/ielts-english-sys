const { Schedule } = require('../models')
const AttendanceService = require('../services/AttendanceService')
const ClassService = require('../services/ClassService')
const UserService = require('../services/UserService')

const createAttendance = async (req, res) => {
  try {
    const { schedule_id, user_id, status } = req.body

    if (!schedule_id || !user_id) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const schedule = await Schedule.findByPk(schedule_id)
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }
    const scheduleData = schedule.get({ plain: true })

    const today = new Date().toISOString().split('T')[0]
    if (scheduleData.date !== today) {
      return res.status(400).json({
        message: 'Attendance date must be today'
      })
    }

    const isInClass = await ClassService.checkUserInClass(
      schedule.class_id,
      user_id
    )
    if (!isInClass) {
      return res.status(403).json({
        message: 'User does not belong to this class or schedule'
      })
    }

    const attendance = await AttendanceService.createAttendance({
      schedule_id,
      user_id,
      status,
      date: scheduleData.date
    })

    return res.status(201).json({
      message: 'Attendance created successfully',
      attendance
    })
  } catch (error) {
    console.error('Error creating attendance:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getAttendancesByClass = async (req, res) => {
  try {
    const { class_id } = req.params
    const { page, limit, date } = req.query

    if (!class_id) {
      return res.status(400).json({ message: 'Missing class_id parameter' })
    }

    const checkClass = await ClassService.getClassInfo(class_id)
    if (!checkClass) {
      return res.status(404).json({ message: 'Class not found' })
    }
    
    const attendances = await AttendanceService.getAttendancesByClassId(
      class_id,
      page,
      limit,
      date
    )

    return res.status(200).json({
      message: 'Attendances retrieved successfully',
      attendances
    })
  } catch (error) {
    console.error('Error getting attendances:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getAttendancesByUser = async (req, res) => {
  try {
    const { user_id } = req.params
    const { page, limit, status, date } = req.query

    if (!user_id) {
      return res.status(400).json({ message: 'Missing user_id parameter' })
    }

    const checkUser = await UserService.findUserById(user_id)
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const attendances = await AttendanceService.getAttendancesByUserId(
      user_id,
      page,
      limit,
      status,
      date
    )

    return res.status(200).json({
      message: 'Attendances for user retrieved successfully',
      attendances
    })
  } catch (error) {
    console.error('Error getting user attendances:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params
    const { date, status } = req.body

    if (!attendance_id || (!date && !status)) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const exists = await AttendanceService.checkAttendanceById(attendance_id)

    if (!exists) {
      return res.status(404).json({ message: 'Attendance not found' })
    }

    const updated = await AttendanceService.updateAttendance(attendance_id, {
      date,
      status
    })

    if (!updated) {
      return res.status(404).json({ message: 'Attendance not found' })
    }

    return res.status(200).json({
      message: 'Attendance updated successfully',
      attendance: updated
    })
  } catch (error) {
    console.error('Error updating attendance:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params
    const exists = await AttendanceService.checkAttendanceById(attendance_id)

    if (!exists) {
      return res.status(404).json({ message: 'Attendance not found' })
    }
    const deleted = await AttendanceService.deleteAttendanceById(attendance_id)

    if (!deleted) {
      return res.status(404).json({ message: 'Attendance not found' })
    }

    return res.status(200).json({ message: 'Attendance deleted successfully' })
  } catch (error) {
    console.error('Error deleting attendance:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  createAttendance,
  getAttendancesByClass,
  getAttendancesByUser,
  updateAttendance,
  deleteAttendance
}
