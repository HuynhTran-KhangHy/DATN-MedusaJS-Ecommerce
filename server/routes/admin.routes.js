const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate: authMiddleware } = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Route Quản lý sản phẩm (Không kiểm tra bất kỳ quyền nào, truy cập tự do)
router.get('/products', adminController.getAllProducts);

// Tất cả các route admin bên dưới đều yêu cầu Auth
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
