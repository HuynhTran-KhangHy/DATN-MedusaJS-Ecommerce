const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  base_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1, // 1: Active, 0: Inactive
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'Products',
  timestamps: true,
  underscored: true,
});
module.exports = Product;
