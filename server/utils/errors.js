class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Yêu cầu không hợp lệ', errors = null) {
    super(message, 400, errors);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Chưa xác thực người dùng') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền truy cập tài nguyên này') {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy tài nguyên yêu cầu') {
    super(message, 404);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Lỗi hệ thống phía server') {
    super(message, 500);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError
};
