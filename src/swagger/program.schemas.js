const ProgramBaseProperties = {
  brand_name: {
    type: 'string',
    description: 'Tên thương hiệu'
  },
  description: {
    type: 'string',
    description: 'Mô tả chương trình'
  }
}

const ProgramCreateSchema = {
  type: 'object',
  required: ['brand_name'],
  properties: ProgramBaseProperties
}

const ProgramUpdateSchema = {
  type: 'object',
  properties: ProgramBaseProperties
}

module.exports = {
  ProgramCreateSchema,
  ProgramUpdateSchema,
  ProgramBaseProperties
}
