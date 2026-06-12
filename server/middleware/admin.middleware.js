const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Bạn cần đăng nhập!' });
  }

  // Role: 1 là Admin
  if (req.user.role !== 1) {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối. Chỉ dành cho Admin!' });
  }

  next();
};

module.exports = adminMiddleware;
