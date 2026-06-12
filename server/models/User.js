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
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true, // Cho phép null cho người dùng đăng nhập bằng Google
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
  },
  otp: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  otp_expiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  tableName: 'Users',
  timestamps: true,
  underscored: true,
});

module.exports = User;
