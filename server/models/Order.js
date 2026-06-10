const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'cod'
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'unpaid' // unpaid, paid, failed
  },
  shippingFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending' // pending, processing, shipped, completed, cancelled
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
