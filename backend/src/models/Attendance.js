const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Attendance = sequelize.define(
  'Attendance',
  {
    attendance_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    schedule_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Present', 'Absent', 'Excused'),
      allowNull: false,
      defaultValue: 'Absent'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Attendance',
    timestamps: false
  }
)

module.exports = Attendance
