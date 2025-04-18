const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Schedule = sequelize.define(
  'Schedule',
  {
    schedule_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    class_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    teacher_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        '2-4-6-s',
        '2-4-6-c',
        '2-4-6-t',
        '3-5-7-s',
        '3-5-7-c',
        '3-5-7-t'
      ),
      allowNull: false
    },
    room: {
      type: DataTypes.STRING(50)
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Schedule',
    timestamps: false
  }
)

module.exports = Schedule
