const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ward: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'cod'
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
