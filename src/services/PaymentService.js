const { Op, fn, col, literal } = require('sequelize')
const { Payment, User, Program } = require('../models')
const dayjs = require('dayjs')

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

const getMonthlyRevenue = async ({ page = 1, limit = 10, date }) => {
  const offset = (page - 1) * limit
  const whereClause = {
    status: 'Paid'
  }

  let yearFilter = null

  if (date) {
    const isYearOnly = /^\d{4}$/.test(date)
    const isYearMonth = /^\d{4}-\d{2}$/.test(date)

    if (isYearOnly) {
      whereClause.paid_at = {
        [Op.gte]: `${date}-01-01`,
        [Op.lte]: `${date}-12-31`
      }
      yearFilter = date
    } else if (isYearMonth) {
      const startOfMonth = dayjs(`${date}-01`)
        .startOf('month')
        .format('YYYY-MM-DD')
      const endOfMonth = dayjs(`${date}-01`).endOf('month').format('YYYY-MM-DD')

      whereClause.paid_at = {
        [Op.gte]: startOfMonth,
        [Op.lte]: endOfMonth
      }

      yearFilter = date.split('-')[0]
    }
  }

  const results = await Payment.findAll({
    attributes: [
      [fn('DATE_FORMAT', col('paid_at'), '%Y-%m'), 'month'],
      [fn('SUM', col('amount')), 'totalRevenue']
    ],
    where: whereClause,
    group: [literal('month')],
    order: [[literal('month'), 'ASC']],
    offset: parseInt(offset),
    limit: parseInt(limit)
  })

  let totalYearRevenue = null
  if (yearFilter) {
    totalYearRevenue = await Payment.sum('amount', {
      where: {
        status: 'Paid',
        paid_at: {
          [Op.between]: [`${yearFilter}-01-01`, `${yearFilter}-12-31`]
        }
      }
    })
  }

  return {
    page: parseInt(page),
    limit: parseInt(limit),
    year: yearFilter,
    totalYearRevenue: totalYearRevenue ? Number(totalYearRevenue) : null,
    data: results.map((r) => r.get({ plain: true }))
  }
}

const getMonthlyRevenueDetails = async ({
  page = 1,
  limit = 10,
  date,
  status,
  user_id,
  program_id
}) => {
  const offset = (parseInt(page) - 1) * parseInt(limit)

  const startDate = dayjs(date).startOf('month').format('YYYY-MM-DD')
  const endDate = dayjs(date).endOf('month').format('YYYY-MM-DD')

  const whereClause = {
    paid_at: {
      [Op.between]: [startDate, endDate]
    }
  }

  if (status) whereClause.status = status
  if (user_id) whereClause.user_id = user_id
  if (program_id) whereClause.program_id = program_id

  const { count, rows } = await Payment.findAndCountAll({
    where: whereClause,
    order: [['paid_at', 'DESC']],
    offset,
    limit: parseInt(limit),
    include: [
      {
        model: User,
        attributes: ['user_id', 'name', 'email']
      },
      {
        model: Program,
        attributes: ['program_id', 'brand_name', 'description']
      }
    ]
  })

  const totalRevenue = await Payment.sum('amount', {
    where: {
      status: 'Paid',
      paid_at: {
        [Op.between]: [startDate, endDate]
      }
    }
  })

  return {
    month: date,
    totalRevenue: totalRevenue || 0,
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByProgram,
  updatePayment,
  getPaymentById,
  checkPaymentStatus,
  deletePayment,
  getMonthlyRevenue,
  getMonthlyRevenueDetails
}
