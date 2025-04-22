const ScoreBaseProperties = {
  user_id: {
    type: 'string',
    description: 'ID người dùng'
  },
  content_id: {
    type: 'string',
    description: 'ID nội dung'
  },
  score: {
    type: 'number',
    minimum: 0,
    maximum: 10,
    description: 'Điểm số (0-10)'
  },
  date: {
    type: 'string',
    format: 'date',
    description: 'Ngày chấm điểm (<= hiện tại)'
  }
}

const ScoreCreateSchema = {
  type: 'object',
  required: ['user_id', 'content_id', 'score', 'date'],
  properties: ScoreBaseProperties
}

const ScoreUpdateSchema = {
  type: 'object',
  properties: ScoreBaseProperties
}

const ScoreClass = {
  type: 'object',
  properties: {
    class_id: {
      type: 'string',
      description: 'ID lớp'
    },
    content_id: {
      type: 'string',
      description: 'ID nội dung'
    }
  }
}

module.exports = {
  ScoreCreateSchema,
  ScoreUpdateSchema,
  ScoreBaseProperties,
  ScoreClass
}
