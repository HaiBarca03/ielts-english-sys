const ContentBaseProperties = {
  program_id: {
    type: 'string',
    description: 'ID chương trình liên kết',
    example: 'f8475d9d-d8b8-4cc7-83d7-d16e5de8b49b'
  },
  type: {
    type: 'string',
    description: 'Loại nội dung (Lesson, Test, Practice)',
    enum: ['Lesson', 'Test', 'Practice'],
    example: 'Lesson'
  },
  title: {
    type: 'string',
    description: 'Tiêu đề nội dung',
    example: 'English Grammar Lesson'
  },
  description: {
    type: 'string',
    description: 'Mô tả về nội dung',
    example: 'This is a grammar lesson focusing on past tense.'
  },
  file_url: {
    type: 'string',
    description: 'URL của tệp (nếu có)',
    example: 'http://example.com/file.mp4'
  },
  youtube_url: {
    type: 'string',
    description: 'URL YouTube (nếu có)',
    example: 'https://youtube.com/some-video'
  },
  duration: {
    type: 'integer',
    description: 'Thời gian của nội dung (phút)',
    example: 30
  }
}

const ContentCreateSchema = {
  type: 'object',
  required: ['program_id', 'type', 'title'],
  properties: ContentBaseProperties
}

const ContentUpdateSchema = {
  type: 'object',
  properties: ContentBaseProperties
}

module.exports = {
  ContentCreateSchema,
  ContentUpdateSchema,
  ContentBaseProperties
}
