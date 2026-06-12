const { AppError } = require('../utils/errors');
const ApiResponse = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error in development environment
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode
  });

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(el => el.message);
    return ApiResponse.error(res, 'Dữ liệu không hợp lệ: ' + messages.join(', '), 400, messages);
  }

  // Handle JWT verification errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 'Token không hợp lệ. Vui lòng đăng nhập lại.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 401);
  }

  // Handle custom AppError instances
  if (err instanceof AppError || err.isOperational) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // Default fallback for unhandled internal errors
  return ApiResponse.error(res, 'Đã có lỗi hệ thống xảy ra.', 500, process.env.NODE_ENV === 'development' ? err.message : null);
};

module.exports = errorHandler;
