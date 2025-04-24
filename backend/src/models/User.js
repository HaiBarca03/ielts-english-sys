const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Student', 'Teacher'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15)
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Nam', 'Nữ', 'Khác')
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    address: {
      type: DataTypes.TEXT
    },
    school: {
      type: DataTypes.STRING(255)
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'User',
    timestamps: false
  }
)

module.exports = User
