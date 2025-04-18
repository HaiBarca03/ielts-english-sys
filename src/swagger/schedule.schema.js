const ScheduleBaseProperties = {
  class_id: {
    type: 'string',
    description: 'ID của lớp học'
  },
  teacher_id: {
    type: 'string',
    description: 'ID của giảng viên'
  },
  date: {
    type: 'string',
    format: 'date',
    description: 'Ngày học'
  },
  start_time: {
    type: 'string',
    format: 'time',
    description: 'Thời gian bắt đầu'
  },
  end_time: {
    type: 'string',
    format: 'time',
    description: 'Thời gian kết thúc'
  },
  room: {
    type: 'string',
    description: 'Phòng học'
  }
}

const ScheduleCreateSchema = {
  type: 'object',
  required: ['class_id', 'teacher_id', 'date', 'start_time', 'end_time'],
  properties: {
    class_id: {
      type: 'string',
      description: 'ID của lớp học'
    },
    teacher_id: {
      type: 'string',
      description: 'ID của giảng viên'
    },
    room: {
      type: 'string',
      description: 'Phòng học'
    },
    type: {
      type: 'string',
      description: 'Loại lịch học'
    }
  }
}

const ScheduleUpdateSchema = {
  type: 'object',
  properties: ScheduleBaseProperties
}

module.exports = {
  ScheduleCreateSchema,
  ScheduleUpdateSchema,
  ScheduleBaseProperties
}
