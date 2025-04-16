const ContentBaseProperties = {
  content_id: {
    type: 'string',
    format: 'uuid',
    description: 'ID nội dung liên kết (có thể null nếu dùng user_id)',
    nullable: true
  },
  user_id: {
    type: 'string',
    format: 'uuid',
    description: 'ID người dùng liên kết (có thể null nếu dùng content_id)',
    nullable: true
  }
}

const ImageBaseProperties = {
  image_id: {
    type: 'string',
    format: 'uuid',
    description: 'ID của ảnh'
  },
  public_id: {
    type: 'string',
    description: 'Public ID trên Cloudinary'
  },
  url: {
    type: 'string',
    description: 'URL ảnh đã upload'
  },
  created_at: {
    type: 'string',
    format: 'date-time',
    description: 'Thời gian tạo'
  },
  ...ContentBaseProperties
}

const ImageCreateSchema = {
  type: 'object',
  required: [],
  properties: {
    ...ContentBaseProperties
  }
}

module.exports = {
  ContentBaseProperties,
  ImageBaseProperties,
  ImageCreateSchema
}
