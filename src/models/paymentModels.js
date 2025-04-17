const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Payment = sequelize.define(
  'Payment',
  {
    payment_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    program_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Paid', 'Unpaid'),
      allowNull: false,
      defaultValue: 'Unpaid'
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    paid_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'Payment',
    timestamps: false
  }
)

module.exports = Payment
