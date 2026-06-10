const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

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
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [Category],
      order: [['createdAt', 'DESC']]
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

// Lấy chi tiết 1 sản phẩm kèm các biến thể (Variants)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: ProductVariant, as: 'variants' }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
