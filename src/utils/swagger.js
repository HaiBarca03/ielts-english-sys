const {
  ContentCreateSchema,
  ContentUpdateSchema,
  ContentBaseProperties
} = require('../swagger/content.schema')
const {
  ProgramCreateSchema,
  ProgramUpdateSchema,
  ProgramBaseProperties
} = require('../swagger/program.schemas')

require('dotenv').config()
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ielts English System API',
    version: '1.0.0',
    description: 'API for managing sys'
  },
  components: {
    schemas: {
      ProgramCreate: ProgramCreateSchema,
      ProgramUpdate: ProgramUpdateSchema,
      Program: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID chương trình'
          },
          ...ProgramBaseProperties,
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      // Các schema cho Content
      ContentCreate: ContentCreateSchema,
      ContentUpdate: ContentUpdateSchema,
      Content: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID content'
          },
          ...ContentBaseProperties,
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://ielts-english-sys.vercel.app/api/v1'
          : 'http://localhost:5000/api/v1'
    }
  ],
  tags: [
    {
      name: 'Programs',
      description: 'API for managing programs'
    }
  ]
}

module.exports = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
}
