const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Content = require('./Content')
const User = require('./User')

const Image = sequelize.define(
  'Images',
  {
    image_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    public_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Images',
    timestamps: false
  }
)

Image.addHook('beforeValidate', (image) => {
  if (!image.content_id && !image.user_id) {
    throw new Error('Either content_id or user_id must be provided.')
  }
})

module.exports = Image
