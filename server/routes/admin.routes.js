const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Tất cả các route admin đều yêu cầu Auth + Admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Lấy danh sách người dùng
router.get('/users', adminController.getAllUsers);

// Cập nhật trạng thái (khóa/mở)
router.patch('/users/:id/status', adminController.updateUserStatus);

// Cập nhật vai trò (cấp quyền seller)
router.patch('/users/:id/role', adminController.updateUserRole);

module.exports = router;
