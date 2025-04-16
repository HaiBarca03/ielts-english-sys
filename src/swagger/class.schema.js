const ClassBaseProperties = {
  class_id: {
    type: 'string',
    description: 'Mã lớp học'
  },
  program_id: {
    type: 'string',
    description: 'Mã chương trình liên kết'
  },
  name: {
    type: 'string',
    description: 'Tên lớp học'
  },
  max_capacity: {
    type: 'integer',
    description: 'Sức chứa tối đa của lớp'
  },
  status: {
    type: 'string',
    enum: ['Full', 'NotFull'],
    description: 'Trạng thái của lớp học'
  },
  start_date: {
    type: 'string',
    format: 'date',
    description: 'Ngày bắt đầu lớp học'
  },
  end_date: {
    type: 'string',
    format: 'date',
    description: 'Ngày kết thúc lớp học'
  },
  created_at: {
    type: 'string',
    format: 'date-time',
    description: 'Ngày tạo lớp học'
  }
}

const ClassCreateSchema = {
  type: 'object',
  required: ['name', 'program_id', 'max_capacity', 'status'],
  properties: {
    program_id: {
      type: 'string',
      description: 'Mã chương trình liên kết'
    },
    name: {
      type: 'string',
      description: 'Tên lớp học'
    },
    max_capacity: {
      type: 'integer',
      description: 'Sức chứa tối đa của lớp'
    },
    start_date: {
      type: 'string',
      format: 'date',
      description: 'Ngày bắt đầu lớp học'
    },
    end_date: {
      type: 'string',
      format: 'date',
      description: 'Ngày kết thúc lớp học'
    }
  }
}

const ClassUpdateSchema = {
  type: 'object',
  properties: ClassBaseProperties
}

const ClassUserSchema = {
  type: 'object',
  required: ['classId', 'userId'],
  properties: {
    userId: {
      type: 'string',
      description: 'Mã người dùng'
    },
    classId: {
      type: 'string',
      description: 'Mã lớp học'
    }
  }
}

module.exports = {
  ClassCreateSchema,
  ClassUpdateSchema,
  ClassBaseProperties,
  ClassUserSchema
}
