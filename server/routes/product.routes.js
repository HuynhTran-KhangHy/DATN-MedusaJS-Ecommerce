const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload');
const { authenticate, isSeller, isAdmin } = require('../middleware/auth.middleware');
const { Product, Category, ProductVariant } = require('../models');
const { Op } = require('sequelize');

// Lấy tất cả sản phẩm với Phân trang, Lọc và Tìm kiếm
router.get('/', async (req, res) => {
  try {
    let { featured, categoryId, minPrice, maxPrice, page, limit, search } = req.query;
    
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 8;
    const offset = (page - 1) * limit;

    const where = {};
    if (featured === 'true') where.is_featured = true;
    if (categoryId) where.category_id = categoryId;
    
    // Tìm kiếm theo tên
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    // Lọc theo giá
    if (minPrice || maxPrice) {
      where.base_price = {};
      if (minPrice) where.base_price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.base_price[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: Category, as: 'category' }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      products,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy sản phẩm nổi bật
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.findAll({ 
      where: { is_featured: true },
      limit: 8,
      include: [{ model: Category, as: 'category' }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/products/seller (cần đăng nhập)
router.get('/seller', authenticate, productController.getSellerProducts);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// POST /api/products (chỉ seller/admin)
router.post('/', authenticate, isSeller, upload.array('images', 5), productController.createProduct);

// PUT /api/products/:id (chỉ seller/admin)
router.put('/:id', authenticate, isSeller, upload.array('images', 5), productController.updateProduct);

// DELETE /api/products/:id (chỉ seller/admin)
router.delete('/:id', authenticate, isSeller, productController.deleteProduct);

module.exports = router;