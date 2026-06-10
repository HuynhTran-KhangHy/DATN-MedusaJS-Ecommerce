const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ProductVariant = sequelize.define('ProductVariant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  variant_name: {
    type: DataTypes.STRING(255),
    allowNull: false, // e.g., "iPhone 15 - Black - 256GB"
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  attributes: {
    type: DataTypes.JSON, // Stores { color: "Black", ram: "8GB", storage: "256GB" }
    allowNull: true,
  }
}, {
  tableName: 'product_variants',
  timestamps: true,
  underscored: true,
});

module.exports = ProductVariant;
