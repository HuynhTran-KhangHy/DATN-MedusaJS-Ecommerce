# BÁO CÁO PHÂN TÍCH CHI TIẾT MÃ NGUỒN DỰ ÁN (TECHNICAL REPORT)
**Mục tiêu:** Giúp sinh viên hiểu rõ từng dòng code quan trọng để thuyết minh và trả lời hội đồng.

---

## 1. PHẦN BACKEND (NODE.JS & EXPRESS)

### A. Logic Bảo Mật & Xác Thực (auth.routes.js)

**Đoạn code 1: Băm mật khẩu (Hash Password)**
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```
- **Ý nghĩa:** Sử dụng thuật toán **Bcrypt** để mã hóa mật khẩu. Con số `10` là "Salt rounds" (độ phức tạp). 
- **Tại sao:** Nếu database bị lộ, hacker cũng không thể biết mật khẩu thật của người dùng vì nó đã biến thành một dãy ký tự ngẫu nhiên.

**Đoạn code 2: Tạo mã OTP ngẫu nhiên**
```javascript
const otp = Math.floor(100000 + Math.random() * 900000).toString();
const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
```
- **Ý nghĩa:** Tạo ra số ngẫu nhiên có 6 chữ số. Thiết lập thời gian hết hạn sau 5 phút kể từ lúc tạo.
- **Phản biện:** Dùng `Date.now()` để lấy thời gian hiện tại cộng thêm 300.000 miligiây (5 phút).

**Đoạn code 3: Tạo Token JWT khi đăng nhập thành công**
```javascript
const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
```
- **Ý nghĩa:** Gói thông tin `id` và `email` vào một "chứng chỉ" điện tử có thời hạn 1 ngày (`1d`).
- **Phản biện:** Token này giúp Client chứng minh đã đăng nhập mà không cần gửi lại username/password trong những lần sau.

---

### B. Logic Sản Phẩm & Phân Trang (product.routes.js)

**Đoạn code 4: Lọc theo khoảng giá và Phân trang**
```javascript
const { count, rows: products } = await Product.findAndCountAll({
  where, // Chứa các điều kiện lọc (price, categoryId)
  limit, // Số lượng bản ghi mỗi trang (ví dụ: 8)
  offset, // Vị trí bắt đầu ( (page - 1) * limit )
  include: [Category] // Join với bảng Category để lấy tên danh mục
});
```
- **Ý nghĩa:** `findAndCountAll` là hàm mạnh mẽ của Sequelize, vừa lấy danh sách dữ liệu (rows), vừa đếm tổng số bản ghi (count) để hỗ trợ việc chia trang ở Frontend.

---

### C. Cơ Sở Dữ Liệu & Liên Kết (models/Product.js)

**Đoạn code 5: Thiết lập quan hệ (Associations)**
```javascript
Product.hasMany(ProductVariant, { foreignKey: 'productId', as: 'variants' });
ProductVariant.belongsTo(Product, { foreignKey: 'productId' });
```
- **Ý nghĩa:** Thiết lập quan hệ **1-n** giữa Sản phẩm và Biến thể. 
- **Phản biện:** Một Sản phẩm có thể có nhiều màu sắc/dung lượng khác nhau. Việc tách bảng giúp dữ liệu không bị trùng lặp và dễ quản lý tồn kho.

---

## 2. PHẦN FRONTEND (REACTJS)

### D. Logic Trang Chủ & Trang Sản Phẩm (Home.jsx / Products.jsx)

**Đoạn code 6: Gọi API đồng thời (Optimization)**
```javascript
const [catRes, prodRes] = await Promise.all([
  axios.get('/api/categories'),
  axios.get('/api/products/featured')
]);
```
- **Ý nghĩa:** Sử dụng `Promise.all` để gọi 2 API cùng một lúc thay vì phải đợi cái này xong mới gọi cái kia. Giúp trang web load nhanh hơn.

---

### E. Logic Chọn Biến Thể ở Trang Chi Tiết (ProductDetail.jsx)

**Đoạn code 7: Cập nhật giá và ảnh theo lựa chọn của người dùng**
```javascript
useEffect(() => {
  if (product?.variants) {
    const match = product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
    setCurrentVariant(match || null);
  }
}, [selectedColor, selectedSize]);
```
- **Ý nghĩa:** Khi người dùng thay đổi Màu (Color) hoặc Size, React sẽ chạy lại hàm này để tìm trong danh sách `variants` xem cái nào khớp với lựa chọn đó.
- **Phản biện:** Nếu tìm thấy (`match`), chúng ta sẽ lấy `match.price` và `match.image` để hiển thị lên màn hình.

---

## 3. CÁC ĐOẠN CODE "XƯƠNG SỐNG" KHÁC

**File .env (Biến môi trường):**
- Giúp tách biệt mã nguồn và các thông tin nhạy cảm (mật khẩu DB, Secret Key). 
- Giúp dễ dàng cấu hình cho các máy khác nhau mà không cần sửa code.

**File index.js (Database Sync):**
```javascript
await sequelize.sync(); 
await seedData();
```
- **`sequelize.sync()`:** Tự động tạo bảng trong SQL dựa trên các Model đã viết ở Node.js. Giúp tiết kiệm thời gian tạo bảng thủ công bằng tay.
- **`seedData()`:** Tự động chèn dữ liệu mẫu nếu database đang trống.

---
**LỜI KHUYÊN KHI GIẢI TRÌNH:**
- Nếu thầy cô hỏi: "Bạn dùng database gì?", hãy trả lời: "**MySQL** và dùng **Sequelize** làm ORM".
- Nếu thầy cô hỏi: "Tại sao trang web chạy mượt?", hãy trả lời: "Vì em dùng **ReactJS** xử lý dữ liệu ở Client và API của Node.js trả về dữ liệu **JSON** rất nhẹ".
- Nếu thầy cô hỏi: "Phân trang làm ở đâu?", hãy trả lời: "**Làm ở cả 2 đầu**. Backend tính toán và cắt dữ liệu, Frontend hiển thị các nút điều hướng".
