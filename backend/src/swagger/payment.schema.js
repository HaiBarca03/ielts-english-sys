const PaymentBaseProperties = {
  user_id: {
    type: 'string',
    description: 'ID của người dùng'
  },
  program_id: {
    type: 'string',
    description: 'ID của chương trình học'
  },
  amount: {
    type: 'number',
    description: 'Số tiền học phí'
  },
  due_date: {
    type: 'string',
    format: 'date',
    description: 'Hạn nộp học phí (YYYY-MM-DD)'
  },
  status: {
    type: 'string',
    enum: ['Paid', 'Unpaid'],
    description: 'Trạng thái thanh toán'
  },
  paid_at: {
    type: 'string',
    format: 'date-time',
    description: 'Thời điểm đã thanh toán (nếu có)'
  }
}

const PaymentCreateSchema = {
  type: 'object',
  required: ['user_id', 'program_id'],
  properties: {
    user_id: {
      type: 'string',
      description: 'ID của người dùng'
    },
    program_id: {
      type: 'string',
      description: 'ID của chương trình học'
    }
  }
}

const PaymentUpdateSchema = {
  type: 'object',
  properties: PaymentBaseProperties
}

module.exports = {
  PaymentCreateSchema,
  PaymentUpdateSchema,
  PaymentBaseProperties
}
