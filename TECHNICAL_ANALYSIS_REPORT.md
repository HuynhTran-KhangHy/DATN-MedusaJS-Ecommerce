# BÁO CÁO PHÂN TÍCH KỸ THUẬT DỰ ÁN (CHI TIẾT PHỤC VỤ BẢO VỆ ĐỒ ÁN)

Tài liệu này giải thích chi tiết các "xương sống" về logic trong dự án, giúp bạn nắm vững để báo cáo và trả lời phản biện trước hội đồng.

---

## 1. HỆ THỐNG XÁC THỰC & BẢO MẬT (PB-03)

### A. Quy trình Đăng ký 2 bước (Register & OTP)
- **Logic**: Khi người dùng đăng ký, server tạo ra một mã OTP 6 số và lưu vào DB kèm theo thời gian hết hạn (`otp_expiry`). Tài khoản lúc này có trạng thái `is_verified: false`.
- **Dòng code quan trọng**:
    ```javascript
    // Tạo OTP ngẫu nhiên
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn sau 5 phút
    ```
- **Phản biện**: "Tại sao dùng OTP?". Giải thích: "Để đảm bảo email đăng ký là thật, tránh việc spam tài khoản ảo và tăng tính bảo mật."

### B. Bảo mật bằng JWT & Middleware
- **Logic**: Sau khi đăng nhập, server trả về một "Token". Mọi hành động nhạy cảm (như sửa hồ sơ) đều phải gửi Token này lên. Middleware `protect` sẽ kiểm tra Token đó.
- **Middleware `protect`**:
    ```javascript
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    ```
- **Phản biện**: "Làm sao biết người dùng đã đăng nhập?". Giải thích: "Nhờ Token JWT được lưu ở `localStorage` của trình duyệt. Mỗi lần gọi API, Frontend sẽ đính kèm Token vào Header Authorization."

---

## 2. HỆ THỐNG GIỎ HÀNG (T08)

### A. Quản lý trạng thái toàn cục (CartContext)
- **Kỹ thuật**: Sử dụng **React Context API** để quản lý giỏ hàng xuyên suốt tất cả các trang mà không cần load lại web.
- **Dòng code đồng bộ LocalStorage**:
    ```javascript
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    ```
- **Phản biện**: "Tại sao tắt trình duyệt mở lại giỏ hàng vẫn còn?". Giải thích: "Vì em sử dụng `useEffect` để tự động lưu mảng `cartItems` vào `localStorage` mỗi khi có thay đổi."

### B. Logic Tính Toán (Subtotal)
- **Hàm tính tổng**:
    ```javascript
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    ```
- **Giải thích**: Dùng hàm `reduce` để duyệt qua mảng mặt hàng, lấy giá nhân với số lượng rồi cộng dồn lại.
- **Sơ đồ luồng dữ liệu (Data Flow)**:
    1. Người dùng bấm "Thêm vào giỏ" -> Hàm `addToCart` trong `CartContext` được gọi.
    2. State `cartItems` cập nhật -> Trình duyệt kích hoạt `useEffect`.
    3. `localStorage.setItem` lưu mảng mới nhất xuống bộ nhớ trình duyệt -> Đảm bảo dữ liệu không mất khi F5.

---
 
---

## 3. HỒ SƠ CÁ NHÂN & TẢI ẢNH (Avatar Upload)

### A. Xử lý tải ảnh bằng Multer
- **Kỹ thuật**: Dùng thư viện `multer` để xử lý định dạng dề liệu `multipart/form-data`.
- **Cấu hình lưu trữ**:
    ```javascript
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/avatars'),
      filename: (req, file, cb) => cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`)
    });
    ```
- **Phản biện**: "Làm sao để ảnh hiển thị được ra giao diện?". Giải thích: "Em cấu hình `app.use('/uploads', express.static('uploads'))` trong `index.js` để biến thư mục uploads thành thư mục công khai, có thể truy cập qua URL."
- **Quy trình kỹ thuật**:
    1. Frontend gửi `FormData` (chứa file binary) lên server.
    2. Server dùng `Multer` để đổi tên file (tránh trùng lặp) và lưu vào ổ đĩa.
    3. Đường dẫn file (vd: `/uploads/avatars/abc.jpg`) được lưu vào cột `avatar` trong bảng `Users`.

### B. Logic Cập nhật thông tin (Update Profile)
- **Kỹ thuật**: Sử dụng phương thức `PUT` của RESTful API.
- **Dòng code xử lý tại Backend**:
    ```javascript
    const { fullName, email, password } = req.body;
    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    ```
- **Lưu ý**: Luôn phải mã hóa mật khẩu bằng `bcrypt` trước khi lưu để đảm bảo an toàn dữ liệu khách hàng.

---

## 4. QUẢN LÝ BIẾN THỂ SẢN PHẨM (T07)

### A. Logic chọn Color/Size (ProductDetail.jsx)
- **Logic**: Mỗi sản phẩm có nhiều `ProductVariant`. Khi người dùng click chọn Màu/Size, React sẽ lọc trong danh sách variants để tìm cái khớp nhất.
- **Dòng code tìm kiếm**:
    ```javascript
    const match = product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
    setCurrentVariant(match || null);
    ```
- **Phản biện**: "Làm sao thay đổi giá khi chọn dung lượng khác?". Giải thích: "Khi tìm thấy `match` (biến thể khớp), em sẽ cập nhật state `currentVariant`, từ đó giao diện sẽ lấy giá (`currentVariant.price`) để hiển thị."

---

## TỔNG KẾT CÁC CÂU HỎI HỘI ĐỒNG THƯỜNG HỎI:

1.  **Hỏi**: Em dùng kiến trúc gì cho dự án?
    *   **Trả lời**: Kiến trúc **RESTful API** với **MERN Stack** (MySQL thay cho MongoDB). Frontend React độc lập với Backend Node.js.
2.  **Hỏi**: Tại sao phải dùng Sequelize?
    *   **Trả lời**: Đây là một **ORM**, giúp em tương tác với MySQL bằng code Javascript, tránh việc phải viết SQL thuần, giúp code nhanh, sạch và bảo mật hơn (tránh SQL Injection).
3.  **Hỏi**: Dự án này có gì nổi bật về UI/UX?
    *   **Trả lời**: Em áp dụng thiết kế **ShopFlow UI** hiện đại, các hiệu ứng Loading Skeleton, thông báo Toast mượt mà và đặc biệt là hệ thống chọn biến thể sản phẩm thông minh như các trang TMĐT lớn (Shopee, Tiki).
