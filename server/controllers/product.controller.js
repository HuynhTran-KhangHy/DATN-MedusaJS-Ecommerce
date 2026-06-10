const { Product, ProductVariant, ProductImage, Category } = require('../models');
const slugify = require('slugify'); // Need to install this if not present, or use a simple regex

// Simple slugify function if library is not installed
const toSlug = (text) => {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, base_price, category_id, seller_id, variants } = req.body;
    const files = req.files;

    // 1. Create Product
    const product = await Product.create({
      name,
      description,
      base_price,
      category_id,
      seller_id, // We should get this from auth middleware later
      slug: `${toSlug(name)}-${Date.now()}`
    });

    // 2. Add Variants
    if (variants && Array.isArray(variants)) {
      const variantsData = variants.map(v => ({
        ...v,
        product_id: product.id
      }));
      await ProductVariant.bulkCreate(variantsData);
    } else if (typeof variants === 'string') {
        // Handle case where multipart form sends JSON string
        const parsedVariants = JSON.parse(variants);
        const variantsData = parsedVariants.map(v => ({
            ...v,
            product_id: product.id
          }));
          await ProductVariant.bulkCreate(variantsData);
    }

    // 3. Add Images
    if (files && files.length > 0) {
      const imagesData = files.map((file, index) => ({
        product_id: product.id,
        image_url: `/uploads/products/${file.filename}`,
        is_main: index === 0 // Set first image as main
      }));
      await ProductImage.bulkCreate(imagesData);
    }

    const fullProduct = await Product.findByPk(product.id, {
      include: ['variants', 'images', 'category']
    });

    res.status(201).json({
      message: 'Tạo sản phẩm thành công!',
      data: fullProduct
    });
  } catch (error) {
    console.error('Lỗi tạo sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm', error: error.message });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const { seller_id } = req.query; // Should be from auth middleware
    const products = await Product.findAll({
      where: { seller_id },
      include: ['variants', 'images', 'category'],
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách sản phẩm', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    // Variants and Images will be handling by DB CASCADE if defined, 
    // but better to clean up files manually later.
    res.json({ message: 'Xóa sản phẩm thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa sản phẩm', error: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: ['variants', 'images', 'category']
    });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy thông tin sản phẩm', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, base_price, category_id, variants, deleteImages } = req.body;
    const files = req.files;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // 1. Update main info
    await product.update({
      name,
      description,
      base_price,
      category_id,
      // Only update slug if name changed? Let's keep it simple
      slug: toSlug(name) + '-' + id
    });

    // 2. Update Variants
    if (variants) {
      const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
      
      // Simplest way: Delete all and recreate (or you could map by ID)
      await ProductVariant.destroy({ where: { product_id: id } });
      const variantsData = parsedVariants.map(v => ({
        ...v,
        product_id: id
      }));
      await ProductVariant.bulkCreate(variantsData);
    }

    // 3. Delete requested images
    if (deleteImages) {
        const imageIds = typeof deleteImages === 'string' ? JSON.parse(deleteImages) : deleteImages;
        await ProductImage.destroy({ where: { id: imageIds } });
    }

    // 4. Add new images
    if (files && files.length > 0) {
      const imagesData = files.map((file) => ({
        product_id: id,
        image_url: `/uploads/products/${file.filename}`,
        is_main: false // Default to false for new images
      }));
      await ProductImage.bulkCreate(imagesData);
    }

    const updatedProduct = await Product.findByPk(id, {
      include: ['variants', 'images', 'category']
    });

    res.json({ message: 'Cập nhật sản phẩm thành công!', data: updatedProduct });
  } catch (error) {
    console.error('Lỗi cập nhật sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm', error: error.message });
  }
};
