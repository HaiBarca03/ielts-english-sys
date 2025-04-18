const paymentService = require('../services/PaymentService')
const ProgramService = require('../services/ProgramService')
const UserService = require('../services/UserService')

const createPayment = async (req, res) => {
  try {
    const { user_id, program_id } = req.body

    const checkProgram = await ProgramService.getProgramById(program_id)
    if (!checkProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }
    const checkUserPayment = await paymentService.checkPaymentStatus(
      user_id,
      program_id
    )
    if (checkUserPayment) {
      return res.status(400).json({ message: 'Payment already made' })
    }
    const ProgramData = checkProgram.get({ plain: true })

    const checkUserRaw = await UserService.findUserById(user_id)
    if (!checkUserRaw) {
      return res.status(404).json({ message: 'User not found' })
    }
    const checkUser = checkUserRaw.get({ plain: true })

    const createdDate = new Date(checkUser.created_at)
    const paid_at = new Date()
    const paidDate = paid_at

    const dueDateObj = new Date(createdDate)
    dueDateObj.setDate(dueDateObj.getDate() + 7)

    const due_date = dueDateObj.toISOString().split('T')[0]

    const timeDiff = paidDate.getTime() - createdDate.getTime()

    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

    const discount = daysDiff <= 3 ? 0.1 : 0

    const amount = (ProgramData.price * (1 - discount)).toFixed(2)

    const data = {
      user_id,
      program_id,
      amount,
      discount,
      due_date,
      paid_at,
      status: 'Paid'
    }

    const newPayment = await paymentService.createPayment(data)

    return res.status(201).json({
      message: 'Payment created successfully',
      newPayment
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllPayments = async (req, res) => {
  try {
    const { status, page, limit, date } = req.query

    const payments = await paymentService.getAllPayments({
      status,
      page,
      limit,
      date
    })

    res.status(200).json(payments)
  } catch (err) {
    console.error('Error fetching payments:', err)
    res.status(500).json({ message: err.message })
  }
}

const getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, page, limit } = req.query

    const checkUser = await UserService.findUserById(userId)
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const payments = await paymentService.getPaymentsByUser(
      userId,
      status,
      page,
      limit
    )

    res.status(200).json(payments)
  } catch (err) {
    console.error('Error fetching payments by user:', err)
    res.status(500).json({ message: err.message })
  }
}

const getPaymentsByProgram = async (req, res) => {
  try {
    const { programId } = req.params
    const { status, page, limit } = req.query

    const checkProgram = await ProgramService.getProgramById(programId)
    if (!checkProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }

    const payments = await paymentService.getPaymentsByProgram(
      programId,
      status,
      page,
      limit
    )

    res.json(payments)
  } catch (err) {
    console.error('Error fetching payments by program:', err)
    res.status(400).json({ message: err.message })
  }
}

const updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params
    const updateData = req.body
    const checkPayment = await paymentService.getPaymentById(paymentId)
    if (!checkPayment) {
      return res.status(404).json({ message: 'Payment not found' })
    }
    const updatedPayment = await paymentService.updatePayment(
      paymentId,
      updateData
    )

    res.status(200).json({
      message: 'Payment updated successfully',
      data: updatedPayment
    })
  } catch (err) {
    console.error('Error updating payment:', err)
    res.status(400).json({ message: err.message })
  }
}

const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params

    const payment = await paymentService.getPaymentById(paymentId)
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }
    res.status(200).json(payment)
  } catch (err) {
    console.error('Error fetching payment by ID:', err)
    res.status(400).json({ message: err.message })
  }
}

const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params

    const payment = await paymentService.getPaymentById(paymentId)
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    const result = await paymentService.deletePayment(paymentId)

    res.status(200).json(result)
  } catch (err) {
    console.error('Error deleting payment:', err)
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByProgram,
  updatePayment,
  getPaymentById,
  deletePayment
}
