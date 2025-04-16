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
const {
  UserUpdateSchema,
  UserRegisterSchema,
  UserBaseProperties,
  UserLoginSchema
} = require('../swagger/user.schema')

require('dotenv').config()
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ielts English System API',
    version: '1.0.0',
    description: 'API for managing sys'
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
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
      },
      // Các schema cho User
      UserCreate: UserRegisterSchema,
      UserUpdate: UserUpdateSchema,
      UserLogin: UserLoginSchema,
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID content'
          },
          ...UserBaseProperties,
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
  security: [
    {
      BearerAuth: []
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
