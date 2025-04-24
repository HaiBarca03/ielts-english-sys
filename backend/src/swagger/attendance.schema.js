const AttendanceBaseProperties = {
  attendance_id: {
    type: 'string',
    description: 'ID của lần điểm danh'
  },
  schedule_id: {
    type: 'string',
    description: 'ID của lịch học'
  },
  user_id: {
    type: 'string',
    description: 'ID của người học viên hoặc giảng viên'
  },
  status: {
    type: 'string',
    enum: ['Present', 'Absent', 'Excused'],
    description: 'Trạng thái điểm danh (Có mặt, Vắng mặt, Được phép vắng)'
  },
  date: {
    type: 'string',
    format: 'date',
    description: 'Ngày điểm danh'
  }
}

const AttendanceCreateSchema = {
  type: 'object',
  required: ['schedule_id', 'user_id'],
  properties: {
    schedule_id: {
      type: 'string',
      description: 'ID của lịch học'
    },
    user_id: {
      type: 'string',
      description: 'ID của người học viên hoặc giảng viên'
    },
    status: {
      type: 'string',
      enum: ['Present', 'Absent', 'Excused'],
      description: 'Trạng thái điểm danh (Có mặt, Vắng mặt, Được phép vắng)'
    }
  }
}

const AttendanceUpdateSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['Present', 'Absent', 'Excused'],
      description: 'Trạng thái điểm danh (Có mặt, Vắng mặt, Được phép vắng)'
    },
    date: {
      type: 'string',
      format: 'date',
      description: 'Ngày điểm danh'
    }
  }
}

module.exports = {
  AttendanceCreateSchema,
  AttendanceUpdateSchema,
  AttendanceBaseProperties
}
