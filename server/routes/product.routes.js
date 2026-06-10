const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Lấy tất cả sản phẩm (có thể lọc theo category hoặc featured)
router.get('/', async (req, res) => {
  try {
    const { featured, categoryId } = req.query;
    const where = {};
    if (featured === 'true') where.is_featured = true;
    if (categoryId) where.categoryId = categoryId;

    const products = await Product.findAll({ 
      where,
      include: [Category] 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy sản phẩm nổi bật (Phím tắt)
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

module.exports = router;
