const { DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const sequelize = require('../config/db.config')

const Program = sequelize.define(
  'Program',
  {
    program_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    brand_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Program',
    timestamps: false
  }
)

module.exports = Program
