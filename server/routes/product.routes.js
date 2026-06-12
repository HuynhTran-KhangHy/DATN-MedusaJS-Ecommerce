const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload');
const { authenticate, isSeller } = require('../middleware/auth.middleware');

// GET /api/products - Lấy danh sách sản phẩm (Phân trang, lọc, tìm kiếm)
router.get('/', productController.getAllProducts);

// GET /api/products/featured - Lấy danh sách sản phẩm nổi bật
router.get('/featured', productController.getFeaturedProducts);

// GET /api/products/seller - Lấy sản phẩm của seller
router.get('/seller', authenticate, productController.getSellerProducts);

// GET /api/products/:id - Lấy thông tin chi tiết một sản phẩm
router.get('/:id', productController.getProductById);

// POST /api/products - Tạo mới sản phẩm (Chỉ dành cho seller/admin)
router.post('/', authenticate, isSeller, upload.array('images', 5), productController.createProduct);

// PUT /api/products/:id - Cập nhật sản phẩm (Chỉ dành cho seller/admin)
router.put('/:id', authenticate, isSeller, upload.array('images', 5), productController.updateProduct);

// DELETE /api/products/:id - Xóa sản phẩm (Chỉ dành cho seller/admin)
router.delete('/:id', authenticate, isSeller, productController.deleteProduct);

module.exports = router;