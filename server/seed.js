const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductVariant = require('./models/ProductVariant');

const seedData = async () => {
  try {
    const categoryCount = await Category.count();
    const zeroPriceCount = await Product.count({ where: { base_price: 0 } });
    const needsReSeed = zeroPriceCount > 0;

    if (categoryCount > 0 && !needsReSeed) {
      console.log('Dữ liệu mẫu đã tồn tại, bỏ qua khởi tạo lại.');
      return;
    }

    if (needsReSeed) {
      console.log('Phát hiện dữ liệu mẫu cũ bị lỗi (giá = 0). Đang dọn dẹp để nạp lại dữ liệu chuẩn...');
      // Xóa theo thứ tự phụ thuộc để tránh lỗi khóa ngoại (Foreign Key)
      await ProductVariant.destroy({ where: {} });
      const ProductImage = require('./models/ProductImage');
      await ProductImage.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      console.log('Đã dọn dẹp dữ liệu cũ thành công!');
    }

    console.log('Đang khởi tạo dữ liệu mẫu...');

    // Tạo danh mục
    const cat1 = await Category.create({ name: 'Điện thoại', image: 'https://cdn-icons-png.flaticon.com/512/0/191.png' });
    const cat2 = await Category.create({ name: 'Laptop', image: 'https://cdn-icons-png.flaticon.com/512/428/428001.png' });
    const cat3 = await Category.create({ name: 'Máy tính bảng', image: 'https://cdn-icons-png.flaticon.com/512/0/532.png' });
    const cat4 = await Category.create({ name: 'Phụ kiện', image: 'https://cdn-icons-png.flaticon.com/512/2/2143.png' });

    // Tạo sản phẩm mẫu
    const p1 = await Product.create({ name: 'iPhone 15 Pro Max', base_price: 30000000, description: 'Sản phẩm mới nhất từ Apple với khung titan siêu bền.', category_id: cat1.id });
    const p2 = await Product.create({ name: 'Samsung Galaxy S24 Ultra', base_price: 28000000, description: 'Siêu phẩm AI từ Samsung hỗ trợ bút S Pen.', category_id: cat1.id });
    
    // Tạo biến thể cho iPhone
    await ProductVariant.bulkCreate([
      { product_id: p1.id, variant_name: 'iPhone 15 Pro Max - Titan Đen - 256GB', price: 30000000, stock: 10, attributes: { color: 'Titan Đen', size: '256GB' } },
      { product_id: p1.id, variant_name: 'iPhone 15 Pro Max - Titan Xanh - 256GB', price: 30000000, stock: 5, attributes: { color: 'Titan Xanh', size: '256GB' } },
      { product_id: p1.id, variant_name: 'iPhone 15 Pro Max - Titan Trắng - 512GB', price: 35000000, stock: 3, attributes: { color: 'Titan Trắng', size: '512GB' } },
    ]);

    // Tạo biến thể cho Samsung
    await ProductVariant.bulkCreate([
      { product_id: p2.id, variant_name: 'Samsung Galaxy S24 Ultra - Xám Titan - 256GB', price: 28000000, stock: 15, attributes: { color: 'Xám Titan', size: '256GB' } },
      { product_id: p2.id, variant_name: 'Samsung Galaxy S24 Ultra - Vàng Titan - 256GB', price: 28000000, stock: 8, attributes: { color: 'Vàng Titan', size: '256GB' } },
    ]);

    // Thêm các sản phẩm khác không có biến thể (hoặc biến thể đơn giản)
    await Product.bulkCreate([
      { name: 'MacBook Air M3', base_price: 26000000, description: 'Laptop mỏng nhẹ hiệu năng cao với chip M3 mạnh mẽ.', category_id: cat2.id },
      { name: 'iPad Pro M2', base_price: 21000000, description: 'Máy tính bảng mạnh mẽ nhất với màn hình Liquid Retina XDR.', category_id: cat3.id },
      { name: 'AirPods Pro 2', base_price: 5500000, description: 'Tai nghe chống ồn đỉnh cao với chip H2.', category_id: cat4.id },
    ]);

    console.log('Khởi tạo dữ liệu mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  }
};

module.exports = seedData;
