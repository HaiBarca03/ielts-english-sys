const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Class = sequelize.define(
  'Class',
  {
    class_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    program_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Full', 'NotFull'),
      defaultValue: 'NotFull',
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY
    },
    end_date: {
      type: DataTypes.DATEONLY
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Class',
    timestamps: false
  }
)

module.exports = Class
