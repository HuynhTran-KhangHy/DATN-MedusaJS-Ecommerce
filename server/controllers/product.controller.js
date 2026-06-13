const { Product, ProductVariant, ProductImage, Category } = require('../models');
const { Op } = require('sequelize');
const ProductResource = require('../resources/ProductResource');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const ApiResponse = require('../utils/response');

// Helper to convert text to slug
const toSlug = (text) => {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// 1. GET /api/products (T-02 & T-04)
exports.getAllProducts = async (req, res, next) => {
  try {
    let { featured, categoryId, minPrice, maxPrice, page, limit, search } = req.query;

    page = Number.parseInt(page, 10);
    limit = Number.parseInt(limit, 10);
    page = Number.isFinite(page) && page > 0 ? page : 1;
    limit = Number.isFinite(limit) && limit > 0 ? limit : 8;

    const offset = (page - 1) * limit;
    const searchTerm = typeof search === 'string' ? search.trim() : '';

    const where = {};

    // Only show active products for general users
    where.status = 1;

    if (categoryId) where.category_id = categoryId;

    // Search by name, description, slug and category name to make the keyword flow more complete.
    if (searchTerm) {
      const keyword = `%${searchTerm}%`;
      where[Op.or] = [
        { name: { [Op.like]: keyword } },
        { description: { [Op.like]: keyword } },
        { slug: { [Op.like]: keyword } },
        { '$category.name$': { [Op.like]: keyword } }
      ];
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.base_price = {};
      if (minPrice) where.base_price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.base_price[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: ['variants', 'images', 'category'],
      distinct: true,
      order: [['created_at', 'DESC']]
    });

    const formattedProducts = ProductResource.collection(products);
    const totalPages = count > 0 ? Math.ceil(count / limit) : 0;

    // Standard envelope + direct fields for frontend compatibility
    res.json({
      success: true,
      message: 'Lấy danh sách sản phẩm thành công!',
      data: {
        products: formattedProducts,
        totalItems: count,
        totalPages,
        currentPage: page
      },
      products: formattedProducts,
      totalItems: count,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/products/featured (T-04)
exports.getFeaturedProducts = async (req, res, next) => {
  try {
const products = await Product.findAll({ 
  where: { status: 1 },
      limit: 8,
      include: ['variants', 'images', 'category'],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      message: 'Lấy danh sách sản phẩm nổi bật thành công!',
      data: ProductResource.collection(products),
      products: ProductResource.collection(products)
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET /api/products/:id (T-04)
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: ['variants', 'images', 'category']
    });
    if (!product) {
      throw new NotFoundError('Không tìm thấy sản phẩm yêu cầu!');
    }
    
    // Return resource directly to maintain frontend compatibility while also exposing the standard data envelope.
    const payload = ProductResource.single(product);
    res.json({
      success: true,
      message: 'Lấy thông tin sản phẩm thành công!',
      data: payload,
      product: payload
    });
  } catch (error) {
    next(error);
  }
};

// 4. POST /api/products (Seller/Admin CRUD)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, base_price, category_id, seller_id, variants } = req.body;
    const files = req.files;

    if (!name || !base_price) {
      throw new BadRequestError('Tên sản phẩm và giá cơ bản là bắt buộc!');
    }

    // 1. Create Product
    const product = await Product.create({
      name,
      description,
      base_price,
      category_id,
      seller_id: seller_id || req.user.id, // Fallback to authenticated user id
      slug: `${toSlug(name)}-${Date.now()}`
    });

    // 2. Add Variants
    if (variants) {
      let parsedVariants = variants;
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (e) {
          throw new BadRequestError('Định dạng JSON của biến thể không hợp lệ!');
        }
      }

      if (Array.isArray(parsedVariants)) {
        const variantsData = parsedVariants.map(v => ({
          ...v,
          product_id: product.id
        }));
        await ProductVariant.bulkCreate(variantsData);
      }
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

    return ApiResponse.success(res, ProductResource.single(fullProduct), 'Tạo sản phẩm thành công!', 201);
  } catch (error) {
    next(error);
  }
};

// 5. GET /api/products/seller
exports.getSellerProducts = async (req, res, next) => {
  try {
    const seller_id = req.query.seller_id || req.user.id;
    const products = await Product.findAll({
      where: { seller_id },
      include: ['variants', 'images', 'category'],
      order: [['created_at', 'DESC']]
    });
    res.json(ProductResource.collection(products));
  } catch (error) {
    next(error);
  }
};

// 6. PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, base_price, category_id, variants, deleteImages } = req.body;
    const files = req.files;

    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError('Không tìm thấy sản phẩm để cập nhật!');
    }

    // 1. Update main info
    await product.update({
      name,
      description,
      base_price,
      category_id,
      slug: toSlug(name) + '-' + id
    });

    // 2. Update Variants
    if (variants) {
      let parsedVariants = variants;
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (e) {
          throw new BadRequestError('Định dạng JSON của biến thể không hợp lệ!');
        }
      }

      if (Array.isArray(parsedVariants)) {
        // Delete all old variants and recreate
        await ProductVariant.destroy({ where: { product_id: id } });
        const variantsData = parsedVariants.map(v => ({
          ...v,
          product_id: id
        }));
        await ProductVariant.bulkCreate(variantsData);
      }
    }

    // 3. Delete requested images
    if (deleteImages) {
      let imageIds = deleteImages;
      if (typeof deleteImages === 'string') {
        try {
          imageIds = JSON.parse(deleteImages);
        } catch (e) {
          imageIds = [deleteImages];
        }
      }
      await ProductImage.destroy({ where: { id: imageIds } });
    }

    // 4. Add new images
    if (files && files.length > 0) {
      const imagesData = files.map((file) => ({
        product_id: id,
        image_url: `/uploads/products/${file.filename}`,
        is_main: false
      }));
      await ProductImage.bulkCreate(imagesData);
    }

    const updatedProduct = await Product.findByPk(id, {
      include: ['variants', 'images', 'category']
    });

    return ApiResponse.success(res, ProductResource.single(updatedProduct), 'Cập nhật sản phẩm thành công!');
  } catch (error) {
    next(error);
  }
};

// 7. DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError('Không tìm thấy sản phẩm cần xóa!');
    }
    
    await Product.destroy({ where: { id } });
    // Note: cascade deletion is handled at DB or manual deletion can be done.
    
    return ApiResponse.success(res, null, 'Xóa sản phẩm thành công!');
  } catch (error) {
    next(error);
  }
};
