const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Lấy tất cả danh mục
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
