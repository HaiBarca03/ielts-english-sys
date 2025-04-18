const { Op } = require('sequelize')
const { Payment, User, Program } = require('../models')

const createPayment = async (data) => {
  const payment = await Payment.create(data)
  return payment
}

const checkPaymentStatus = async (user_id, program_id) => {
  const payment = await Payment.findOne({
    where: {
      user_id: user_id,
      program_id: program_id,
      status: 'Paid'
    }
  })
  return payment
}

const getAllPayments = async ({ status, page = 1, limit = 10, date }) => {
  const whereClause = {}
  if (status) whereClause.status = status
  if (date) {
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)

    whereClause.paid_at = {
      [Op.gte]: startDate,
      [Op.lt]: endDate
    }
  }

  const offset = (parseInt(page) - 1) * parseInt(limit)

  const { count, rows } = await Payment.findAndCountAll({
    where: whereClause,
    offset,
    limit: parseInt(limit),
    include: [
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      },
      {
        model: Program,
        attributes: ['program_id', 'brand_name']
      }
    ],
    order: [['created_at', 'DESC']]
  })

  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getPaymentsByUser = async (userId, status, page = 1, limit = 10) => {
  const whereClause = { user_id: userId }
  if (status) whereClause.status = status

  const offset = (parseInt(page) - 1) * parseInt(limit)

  const { count, rows } = await Payment.findAndCountAll({
    where: whereClause,
    offset,
    limit: parseInt(limit),
    include: [
      {
        model: Program,
        attributes: ['program_id', 'brand_name']
      }
    ],
    order: [['paid_at', 'DESC']]
  })

  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getPaymentsByProgram = async (
  programId,
  status,
  page = 1,
  limit = 10
) => {
  const whereClause = { program_id: programId }
  if (status) whereClause.status = status

  const offset = (parseInt(page) - 1) * parseInt(limit)

  const { count, rows } = await Payment.findAndCountAll({
    where: whereClause,
    offset,
    limit: parseInt(limit),
    include: [
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      }
    ],
    order: [['paid_at', 'DESC']]
  })

  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const updatePayment = async (paymentId, data) => {
  const payment = await Payment.findByPk(paymentId)
  await payment.update(data)
  return payment
}

const getPaymentById = async (paymentId) => {
  const payment = await Payment.findByPk(paymentId, {
    include: [
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      },
      {
        model: Program,
        attributes: ['program_id', 'brand_name']
      }
    ]
  })

  return payment
}

const deletePayment = async (paymentId) => {
  const payment = await Payment.findByPk(paymentId)
  await payment.destroy()
  return { message: 'Payment deleted successfully' }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByProgram,
  updatePayment,
  getPaymentById,
  checkPaymentStatus,
  deletePayment
}
