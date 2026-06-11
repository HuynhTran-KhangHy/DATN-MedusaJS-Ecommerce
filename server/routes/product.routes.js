const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload');
const { Product, Category, ProductVariant } = require('../models');
const { Op } = require('sequelize');

// Lấy tất cả sản phẩm với Phân trang và Lọc
router.get('/', async (req, res) => {
  try {
    let { featured, categoryId, minPrice, maxPrice, page, limit } = req.query;
    
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 8;
    const offset = (page - 1) * limit;

    const where = {};
    if (featured === 'true') where.is_featured = true;
    if (categoryId) where.categoryId = categoryId;
    
    // Lọc theo giá
    if (minPrice || maxPrice) {
      // NOTE: Should check base_price since we renamed price to base_price in Product schema
      where.base_price = {};
      if (minPrice) where.base_price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.base_price[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [Category],
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
      include: [Category]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/products
router.post('/', upload.array('images', 5), productController.createProduct);

// GET /api/products/seller
router.get('/seller', productController.getSellerProducts);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// PUT /api/products/:id
router.put('/:id', upload.array('images', 5), productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;
