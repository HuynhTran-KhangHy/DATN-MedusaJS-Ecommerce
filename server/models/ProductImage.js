const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ProductImage = sequelize.define('ProductImage', {
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
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_main: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  alt_text: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'product_images',
  timestamps: true,
  underscored: true,
});

module.exports = ProductImage;
