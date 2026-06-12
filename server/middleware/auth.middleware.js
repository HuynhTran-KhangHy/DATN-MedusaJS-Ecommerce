const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

// Xác thực JWT
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Không tìm thấy token xác thực hoặc sai định dạng!');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

// Chỉ seller hoặc admin mới được phép
const isSeller = (req, res, next) => {
  try {
    if (!req.user || (req.user.role !== 1 && req.user.role !== 2)) {
      throw new ForbiddenError('Bạn không có quyền truy cập tài nguyên này!');
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Chỉ admin mới được phép
const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 2) {
      throw new ForbiddenError('Chỉ admin mới có quyền thực hiện!');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, isSeller, isAdmin };