const Category = require('./models/Category');
const Product = require('./models/Product');

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
    await Product.bulkCreate([
      { name: 'iPhone 15 Pro Max', price: 30000000, description: 'Sản phẩm mới nhất từ Apple', is_featured: true, categoryId: cat1.id, image: 'https://img.tgdd.vn/img-border/iphone-15-pro-max-blue-1-600x600.jpg' },
      { name: 'Samsung Galaxy S24 Ultra', price: 28000000, description: 'Siêu phẩm AI từ Samsung', is_featured: true, categoryId: cat1.id, image: 'https://img.tgdd.vn/img-border/samsung-galaxy-s24-ultra-grey-600x600.jpg' },
      { name: 'MacBook Air M3', price: 26000000, description: 'Laptop mỏng nhẹ hiệu năng cao', is_featured: true, categoryId: cat2.id, image: 'https://img.tgdd.vn/img-border/macbook-air-m3-13-inch-8gb-256gb-silver-600x600.jpg' },
      { name: 'iPad Pro M2', price: 21000000, description: 'Máy tính bảng mạnh mẽ nhất', is_featured: true, categoryId: cat3.id, image: 'https://img.tgdd.vn/img-border/ipad-pro-m2-11-wifi-grey-600x600.jpg' },
      { name: 'AirPods Pro 2', price: 5500000, description: 'Tai nghe chống ồn đỉnh cao', is_featured: true, categoryId: cat4.id, image: 'https://img.tgdd.vn/img-border/airpods-pro-2-600x600.jpg' },
    ]);

    console.log('Khởi tạo dữ liệu mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  }
};

module.exports = seedData;
