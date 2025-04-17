const {
  AttendanceBaseProperties,
  AttendanceCreateSchema,
  AttendanceUpdateSchema
} = require('../swagger/attendance.schema')
const {
  ClassUpdateSchema,
  ClassCreateSchema,
  ClassUserSchema,
  ClassBaseProperties
} = require('../swagger/class.schema')
const {
  ContentCreateSchema,
  ContentUpdateSchema,
  ContentBaseProperties
} = require('../swagger/content.schema')
const {
  PaymentCreateSchema,
  PaymentUpdateSchema,
  PaymentBaseProperties
} = require('../swagger/payment.schema')
const {
  ProgramCreateSchema,
  ProgramUpdateSchema,
  ProgramBaseProperties
} = require('../swagger/program.schemas')
const {
  ScheduleCreateSchema,
  ScheduleUpdateSchema,
  ScheduleBaseProperties
} = require('../swagger/schedule.schema')
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
      },
      // Các schema cho class
      ClassCreate: ClassCreateSchema,
      ClassUpdate: ClassUpdateSchema,
      ClassUserCreate: ClassUserSchema,
      Class: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID class'
          },
          ...ClassBaseProperties,
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
      // Các schema cho schedule
      ScheduleCreate: ScheduleCreateSchema,
      ScheduleUpdate: ScheduleUpdateSchema,
      Schedule: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID class'
          },
          ...ScheduleBaseProperties,
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
      // Các schema cho attendance
      AttendanceCreate: AttendanceCreateSchema,
      AttendanceUpdate: AttendanceUpdateSchema,
      Attendance: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID attendance'
          },
          ...AttendanceBaseProperties,
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
      // Các schema cho payment
      PaymentCreate: PaymentCreateSchema,
      PaymentUpdate: PaymentUpdateSchema,
      Payment: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID attendance'
          },
          ...PaymentBaseProperties,
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
          ? 'https://ielts-english-sys.onrender.com/api/v1'
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
