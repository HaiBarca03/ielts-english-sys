const jwt = require('jsonwebtoken')
const { User } = require('../models')
require('dotenv').config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env')
}

const verifyToken = async (req) => {
  try {
    const authHeader = req.headers.token || req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Access token missing. token denied.')
    }
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findByPk(decoded.user_id)
    if (!user) {
      throw new Error('User not founddd')
    }

    return { user, decoded }
  } catch (error) {
    throw error
  }
}

const authorizeUser = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 401).json({
      success: false,
      message: error.message
    })
  }
}

const authorizeAdmin = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    if (user.role !== 'Admin') {
      throw new Error('Chỉ admin mới có quyền truy cập')
    }
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 403).json({
      success: false,
      message: error.message
    })
  }
}

const authorizeAdminTeacher = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    if (user.role !== 'Admin' && user.role !== 'Teacher') {
      throw new Error('Chỉ admin hoặc teacher mới có quyền truy cập')
    }
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 403).json({
      success: false,
      message: error.message
    })
  }
}

const authorizeTeacher = async (req, res, next) => {
  try {
    const { user } = await verifyToken(req)
    if (user.role !== 'Teacher') {
      throw new Error('Chỉ teacher mới có quyền truy cập')
    }
    req.user = user
    next()
  } catch (error) {
    console.error('token error:', error.message)
    res.status(error.message.includes('not found') ? 404 : 403).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  authorizeUser,
  authorizeAdmin,
  authorizeAdminTeacher,
  authorizeTeacher
}
