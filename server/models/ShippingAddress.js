const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Order = require('./Order');

const ShippingAddress = sequelize.define('ShippingAddress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
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
  }
}, {
  tableName: 'shipping_addresses',
  timestamps: false
});

// Associations
Order.hasOne(ShippingAddress, { foreignKey: 'orderId', as: 'shippingAddress' });
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = ShippingAddress;
