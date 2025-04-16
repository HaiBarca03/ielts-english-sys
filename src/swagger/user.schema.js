const UserBaseProperties = {
  name: {
    type: 'string',
    description: 'Họ và tên người dùng'
  },
  email: {
    type: 'string',
    description: 'Email người dùng'
  },
  phone: {
    type: 'string',
    description: 'Số điện thoại'
  },
  password: {
    type: 'string',
    description: 'Mật khẩu người dùng'
  },
  role: {
    type: 'string',
    enum: ['Admin', 'Student', 'Teacher'],
    description: 'Vai trò người dùng'
  },
  gender: {
    type: 'string',
    enum: ['Nam', 'Nữ', 'Khác'],
    description: 'Giới tính'
  },
  dob: {
    type: 'string',
    format: 'date',
    description: 'Ngày sinh'
  },
  address: {
    type: 'string',
    description: 'Địa chỉ'
  },
  school: {
    type: 'string',
    description: 'Trường học'
  }
}

const UserLoginProperties = {
  email: {
    type: 'string',
    description: 'ad@gmail.com'
  },
  password: {
    type: 'string',
    description: '11111111'
  }
}

const UserRegisterSchema = {
  type: 'object',
  required: ['name', 'email', 'password', 'role'],
  properties: UserBaseProperties
}

const UserLoginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: UserLoginProperties
}

const UserUpdateSchema = {
  type: 'object',
  properties: UserBaseProperties
}

module.exports = {
  UserRegisterSchema,
  UserUpdateSchema,
  UserBaseProperties,
  UserLoginSchema
}
