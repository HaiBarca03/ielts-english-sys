const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Score = sequelize.define(
  'Score',
  {
    score_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    content_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    tableName: 'Score',
    timestamps: false
  }
)

module.exports = Score
