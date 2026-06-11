const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh mục', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      slug: name.toLowerCase().replace(/ /g, '-')
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo danh mục', error: error.message });
  }
};
