const { Program, Class, User } = require('../models')
const dayjs = require('dayjs')
const ClassService = require('../services/ClassService')
const programService = require('../services/ProgramService')

const createClass = async (req, res) => {
  try {
    const { name, program_id } = req.body

    if (!name || !program_id) {
      return res
        .status(400)
        .json({ message: 'Thiếu tên lớp hoặc chương trình' })
    }

    const program = await Program.findByPk(program_id)
    if (!program) {
      return res.status(404).json({ message: 'Program không tồn tại' })
    }

    const startDate = dayjs().format('YYYY-MM-DD')
    const endDate = dayjs().add(9, 'month').format('YYYY-MM-DD')

    const classData = {
      name,
      program_id,
      max_capacity: req.body.max_capacity || 15,
      start_date: req.body.start_date || startDate,
      end_date: req.body.end_date || endDate
    }

    const newClass = await ClassService.createClass(classData)

    return res.status(201).json({
      message: 'Class created successfully',
      data: newClass
    })
  } catch (error) {
    console.error('Error creating class:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const getClassesByProgram = async (req, res) => {
  const { program_id } = req.params

  try {
    const program = await Program.findByPk(program_id)
    if (!program) {
      return res.status(404).json({ message: 'Program không tồn tại' })
    }

    const classes = await ClassService.getClassesByProgramId(program_id)

    const classCount = classes.length

    if (classCount === 0) {
      return res
        .status(404)
        .json({ message: 'No classes found for this program' })
    }

    return res.status(200).json({
      message: 'Classes retrieved successfully',
      classCount,
      classes
    })
  } catch (error) {
    console.error('Error getting classes by program ID:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const getClassInfo = async (req, res) => {
  const { class_id } = req.params

  try {
    const classInfo = await ClassService.getClassInfo(class_id)

    return res.status(200).json({
      message: 'Class information retrieved successfully',
      classInfo
    })
  } catch (error) {
    console.error('Error getting class info:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const getAllClasses = async (req, res) => {
  try {
    const { status, start_date, end_date, page = 1, limit = 10 } = req.query

    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)

    const { classes, totalItems, totalPages } =
      await ClassService.getAllClasses(
        status,
        start_date,
        end_date,
        pageNumber,
        limitNumber
      )

    return res.status(200).json({
      message: 'All classes retrieved successfully',
      currentPage: pageNumber,
      totalPages,
      totalClasses: totalItems,
      classes
    })
  } catch (error) {
    console.error('Error getting all classes:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const updateClass = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    if (req.body.program_id) {
      const program = await programService.getProgramById(req.body.program_id)
      if (!program) {
        return res.status(404).json({
          message: 'Program not found'
        })
      }
    }

    const updatedClass = await ClassService.updateClass(id, updateData)

    return res.status(200).json({
      message: 'Class updated successfully',
      data: updatedClass
    })
  } catch (error) {
    console.error('Error updating class:', error)
    return res.status(500).json({
      message: error.message || 'Internal server error'
    })
  }
}

const deleteClass = async (req, res) => {
  try {
    const { id } = req.body

    if (!id || (Array.isArray(id) && id.length === 0)) {
      return res.status(400).json({ message: 'No class ID provided' })
    }

    await ClassService.deleteClass(id)

    return res.status(200).json({ message: 'Classes deleted successfully' })
  } catch (error) {
    console.error('Error deleting classes:', error)
    return res.status(500).json({
      message: error.message || 'Internal server error'
    })
  }
}

const addUserToClass = async (req, res) => {
  try {
    const { classId, userId } = req.body

    const classInstance = await Class.findByPk(classId, {
      include: [
        {
          model: User,
          attributes: ['user_id', 'name', 'role', 'email']
        },
        {
          model: Program,
          attributes: ['program_id', 'brand_name', 'description']
        }
      ]
    })
    if (!classInstance) {
      return res.status(404).json({ message: 'Class not found' })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isJoined = await classInstance.hasUser(user)
    if (isJoined) {
      return res.status(400).json({ message: 'User already joined this class' })
    }

    const currentCount = classInstance.Users?.length || 0
    if (currentCount >= classInstance.max_capacity) {
      return res.status(400).json({ message: 'Class is already full' })
    }

    await ClassService.addUserToClass(classInstance, user)

    return res.status(200).json({
      message: 'User added to class successfully',
      class: classInstance
    })
  } catch (error) {
    console.error('Error adding user to class:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteUserFromClass = async (req, res) => {
  try {
    const { classId, userId } = req.params

    const classInstance = await Class.findByPk(classId)
    if (!classInstance) {
      return res.status(404).json({ message: 'Class not found' })
    }

    const userInstance = await User.findByPk(userId)
    if (!userInstance) {
      return res.status(404).json({ message: 'User not found' })
    }

    await ClassService.removeUserFromClass(classInstance, userInstance)

    return res.status(200).json({
      message: 'User removed from class successfully'
    })
  } catch (error) {
    console.error('Error removing user from class:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const getStudentCount = async (req, res) => {
  const { class_id } = req.params

  try {
    const count = await ClassService.countStudentsInClass(class_id)

    return res.status(200).json({
      message: 'Student count retrieved successfully',
      studentCount: count
    })
  } catch (error) {
    console.error('Error getting student count:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = {
  createClass,
  getClassesByProgram,
  getClassInfo,
  getAllClasses,
  updateClass,
  deleteClass,
  addUserToClass,
  deleteUserFromClass,
  getStudentCount
}
