const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Program = require('./Program')
const Image = require('./Images')

const Content = sequelize.define(
  'Content',
  {
    content_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    program_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Lesson', 'Test', 'Practice'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    file_url: {
      type: DataTypes.STRING(255)
    },
    youtube_url: {
      type: DataTypes.STRING(255)
    },
    duration: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Content',
    timestamps: false
  }
)

module.exports = Content
