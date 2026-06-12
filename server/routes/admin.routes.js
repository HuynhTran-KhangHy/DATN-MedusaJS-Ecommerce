const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate: authMiddleware } = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Tất cả các route admin đều yêu cầu Auth + Admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// --- Quản lý người dùng (PB-11) ---
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.patch('/users/:id/role', adminController.updateUserRole);

// --- Duyệt sản phẩm (PB-10) ---
router.get('/products/pending', adminController.getPendingProducts);
router.patch('/products/:id/approve', adminController.approveProduct);
router.patch('/products/:id/reject', adminController.rejectProduct);

module.exports = router;
