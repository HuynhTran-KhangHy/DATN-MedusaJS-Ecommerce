const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0,
  },
  status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1,
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

module.exports = User;
