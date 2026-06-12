# TỔNG KẾT DỰ ÁN & NHẬT KÝ KHẮC PHỤC LỖI (BUG LOG)

Tài liệu này tổng hợp toàn bộ các tính năng hiện có và các lỗi kỹ thuật đã được xử lý để phục vụ báo cáo dự án.

---

## 1. DANH SÁCH CÁC TRANG & CHỨC NĂNG (FEATURES)

### A. Các trang hiện có (Pages)
1.  **Trang chủ (Home)**: Banner Hero, Danh mục sản phẩm nổi bật, Lưới sản phẩm Hot.
2.  **Cửa hàng (Products)**: Danh sách sản phẩm, bộ lọc theo danh mục và giá tiền.
3.  **Chi tiết sản phẩm (Product Detail)**: Xem thông tin, chọn biến thể (Màu/Size), cập nhật giá thực tế, thêm vào giỏ hàng.
4.  **Giỏ hàng (Cart)**: Xem danh sách, thay đổi số lượng, xóa sản phẩm, tính tổng tiền.
5.  **Hồ sơ (Profile)**: Xem thông tin cá nhân, cập nhật Họ tên/Email/Mật khẩu, tải ảnh đại diện (Avatar).
6.  **Đăng nhập (Login)**: Xác thực người dùng, lưu Token bảo mật.
7.  **Đăng ký (Register)**: Quy trình 2 bước - Đăng ký thông tin và xác nhận mã OTP.

### B. Chức năng kỹ thuật (Technical Features)
- **Quản lý biến thể**: Tự động khớp giá và ảnh khi chọn Màu/Size khác nhau.
- **Quản lý giỏ hàng toàn cục**: Dùng React Context để dữ liệu đồng bộ giữa các trang.
- **Bảo mật JWT**: Middleware bảo vệ các trang cá nhân, chỉ cho phép người dùng đã xác thực truy cập.
- **Upload File**: Tích hợp Multer để xử lý tải ảnh đại diện lên máy chủ.

---

## 2. NHẬT KÝ SỬA LỖI (BUG FIX LOG)

| STT | Lỗi gặp phải | Nguyên nhân | Giải pháp khắc phục |
|:---:|:---|:---|:---|
| 1 | **Module Not Found: 'passport'** | Thư viện Passport chưa được cài đặt vào `node_modules`. | Chạy `npm install` để cài đặt đầy đủ các gói phụ thuộc cho Server. |
| 2 | **ER_TOO_MANY_KEYS** | Chế độ `sync({ alter: true })` cố gắng tạo thêm chỉ mục duy nhất cho email nhiều lần. | Chuyển `alter` về `false` sau khi các trường `fullName`, `avatar` đã được thêm thành công vào DB. |
| 3 | **Nodemon Infinity Restart** | Nodemon theo dõi folder `uploads`, mỗi khi tải ảnh lên server lại tự khởi động lại. | Tạo tệp `nodemon.json` để Server bỏ qua (ignore) các thay đổi trong thư mục `uploads`. |
| 4 | **Bootstrap Icons missing** | Frontend thiếu thư viện icon dẫn đến lỗi compile hoặc không hiện icon. | Cài đặt `bootstrap-icons` và import trực tiếp vào `main.jsx`. |
| 5 | **Sai lệch trường dữ liệu** | Frontend dùng `price`, Backend dùng `base_price` dẫn đến không hiện giá. | Đồng bộ hóa code Frontend để sử dụng đúng tên trường dữ liệu từ Database. |
| 6 | **Header không cập nhật** | State của Header không nhận biết được khi người dùng vừa đăng nhập. | Sử dụng `useEffect` lắng nghe sự thay đổi của Route và `localStorage` để cập nhật UI ngay lập tức. |

---

## 3. THÔNG SỐ KỸ THUẬT (TECH STACK)
- **Frontend**: React.js (Vite), ShopFlow UI (Vanilla CSS), Axios.
- **Backend**: Node.js, Express, Sequelize (ORM).
- **Database**: MySQL.
- **Xác thực**: JWT (JSON Web Token), mã hóa Bcrypt.
- **Upload**: Multer.
