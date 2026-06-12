const jwt = require('jsonwebtoken');

// Xác thực JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Không có token!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ!' });
  }
};

// Chỉ seller hoặc admin mới được phép
const isSeller = (req, res, next) => {
  if (req.user.role !== 1 && req.user.role !== 2) {
    return res.status(403).json({ message: 'Bạn không có quyền thực hiện!' });
  }
  next();
};

// Chỉ admin mới được phép
const isAdmin = (req, res, next) => {
  if (req.user.role !== 2) {
    return res.status(403).json({ message: 'Chỉ admin mới được phép!' });
  }
  next();
};

module.exports = { authenticate, isSeller, isAdmin };