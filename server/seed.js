const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductVariant = require('./models/ProductVariant');

const seedData = async () => {
  try {
    const categoryCount = await Category.count();
    if (categoryCount > 0) return; // Đã có dữ liệu

    console.log('Đang khởi tạo dữ liệu mẫu...');

    // Tạo danh mục
    const cat1 = await Category.create({ name: 'Điện thoại', image: 'https://cdn-icons-png.flaticon.com/512/0/191.png' });
    const cat2 = await Category.create({ name: 'Laptop', image: 'https://cdn-icons-png.flaticon.com/512/428/428001.png' });
    const cat3 = await Category.create({ name: 'Máy tính bảng', image: 'https://cdn-icons-png.flaticon.com/512/0/532.png' });
    const cat4 = await Category.create({ name: 'Phụ kiện', image: 'https://cdn-icons-png.flaticon.com/512/2/2143.png' });

    // Tạo sản phẩm mẫu
    const p1 = await Product.create({ name: 'iPhone 15 Pro Max', price: 30000000, description: 'Sản phẩm mới nhất từ Apple với khung titan siêu bền.', is_featured: true, categoryId: cat1.id, image: 'https://img.tgdd.vn/img-border/iphone-15-pro-max-blue-1-600x600.jpg' });
    const p2 = await Product.create({ name: 'Samsung Galaxy S24 Ultra', price: 28000000, description: 'Siêu phẩm AI từ Samsung hỗ trợ bút S Pen.', is_featured: true, categoryId: cat1.id, image: 'https://img.tgdd.vn/img-border/samsung-galaxy-s24-ultra-grey-600x600.jpg' });
    
    // Tạo biến thể cho iPhone
    await ProductVariant.bulkCreate([
      { productId: p1.id, color: 'Titan Đen', size: '256GB', price: 30000000, stock: 10, image: 'https://img.tgdd.vn/img-border/iphone-15-pro-max-black-600x600.jpg' },
      { productId: p1.id, color: 'Titan Xanh', size: '256GB', price: 30000000, stock: 5, image: 'https://img.tgdd.vn/img-border/iphone-15-pro-max-blue-1-600x600.jpg' },
      { productId: p1.id, color: 'Titan Trắng', size: '512GB', price: 35000000, stock: 3, image: 'https://img.tgdd.vn/img-border/iphone-15-pro-max-white-600x600.jpg' },
    ]);

    // Tạo biến thể cho Samsung
    await ProductVariant.bulkCreate([
      { productId: p2.id, color: 'Xám Titan', size: '256GB', price: 28000000, stock: 15, image: 'https://img.tgdd.vn/img-border/samsung-galaxy-s24-ultra-grey-600x600.jpg' },
      { productId: p2.id, color: 'Vàng Titan', size: '256GB', price: 28000000, stock: 8, image: 'https://img.tgdd.vn/img-border/samsung-galaxy-s24-ultra-yellow-600x600.jpg' },
    ]);

    // Thêm các sản phẩm khác không có biến thể (hoặc biến thể đơn giản)
    await Product.bulkCreate([
      { name: 'MacBook Air M3', price: 26000000, description: 'Laptop mỏng nhẹ hiệu năng cao với chip M3 mạnh mẽ.', is_featured: true, categoryId: cat2.id, image: 'https://img.tgdd.vn/img-border/macbook-air-m3-13-inch-8gb-256gb-silver-600x600.jpg' },
      { name: 'iPad Pro M2', price: 21000000, description: 'Máy tính bảng mạnh mẽ nhất với màn hình Liquid Retina XDR.', is_featured: true, categoryId: cat3.id, image: 'https://img.tgdd.vn/img-border/ipad-pro-m2-11-wifi-grey-600x600.jpg' },
      { name: 'AirPods Pro 2', price: 5500000, description: 'Tai nghe chống ồn đỉnh cao với chip H2.', is_featured: true, categoryId: cat4.id, image: 'https://img.tgdd.vn/img-border/airpods-pro-2-600x600.jpg' },
    ]);

    console.log('Khởi tạo dữ liệu mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  }
};

module.exports = seedData;
