const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');
const ProductImage = require('./ProductImage');

// Relationships

// Category <-> Product
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// User (Seller) <-> Product
User.hasMany(Product, { foreignKey: 'seller_id', as: 'selling_products' });
Product.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

// Product <-> ProductVariant
Product.hasMany(ProductVariant, { foreignKey: 'product_id', as: 'variants' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

// Product <-> ProductImage
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  User,
  Category,
  Product,
  ProductVariant,
  ProductImage
};
