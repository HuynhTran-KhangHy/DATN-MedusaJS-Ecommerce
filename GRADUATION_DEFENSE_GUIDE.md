# TÀI LIỆU ÔN TẬP VÀ PHẢN BIỆN ĐỒ ÁN TỐT NGHIỆP
**Dự án:** Hệ thống Thương mại Điện tử (E-commerce Web)

---

## 1. KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)
Hệ thống được xây dựng theo mô hình **Client-Server** tách biệt:
- **Backend (Server):** Sử dụng **Node.js** và framework **Express.js**. Đây là nơi xử lý logic nghiệp vụ, bảo mật và tương tác với cơ sở dữ liệu.
- **Frontend (Client):** Sử dụng **ReactJS** (với Vite). Đảm bảo giao diện mượt mà (SPA - Single Page Application) và trải nghiệm người dùng tối ưu.
- **Cơ sở dữ liệu:** **MySQL** thông qua ORM **Sequelize**. Việc dùng ORM giúp quản lý dữ liệu dưới dạng các đối tượng (Objects), giúp mã nguồn dễ đọc và bảo trì hơn SQL thuần.

---

## 2. HỆ THỐNG XÁC THỰC & BẢO MẬT (AUTHENTICATION)
Đây là phần quan trọng nhất để trả lời về bảo mật:
- **Mã hóa mật khẩu:** Sử dụng thư viện **bcryptjs**. Mật khẩu không bao giờ được lưu dưới dạng văn bản thuần mà được "hash" kèm với "salt" để chống lại các cuộc tấn công Brute-force.
- **Xác thực OTP:** Trước khi cho phép đăng nhập, hệ thống yêu cầu xác thực qua Email. Điều này đảm bảo Email là thật và tăng tính bảo mật cho tài khoản.
- **Quản lý phiên đăng nhập (JWT):** Sử dụng **JSON Web Token**. Sau khi đăng nhập, Server trả về 1 chuỗi token. Client sẽ lưu token này (thường là localStorage) và gửi kèm trong header của mỗi yêu cầu tiếp theo để định danh mà không cần gửi lại mật khẩu.

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DESIGN)
Hệ thống sử dụng các bảng có quan hệ (Relational Database):
- **User:** Lưu thông tin người dùng và trạng thái xác thực (`is_verified`).
- **Category & Product:** Quan hệ **1-n** (Một danh mục có nhiều sản phẩm).
- **Product & ProductVariant:** Quan hệ **1-n**. Một sản phẩm (như iPhone 15) có nhiều biến thể (Màu sắc, Dung lượng). Mỗi biến thể có Giá và Tồn kho riêng. Đây là điểm mạnh của đồ án vì xử lý được bài toán thực tế của các cửa hàng bán lẻ.

---

## 4. CHI TIẾT CÁC TÍNH NĂNG NỔI BẬT

### A. Lọc và Phân trang (Filtering & Pagination)
- **Tại sao cần phân trang?** Để tối ưu hiệu năng. Thay vì tải 1000 sản phẩm cùng lúc làm chậm trình duyệt, ta chỉ tải 8 sản phẩm mỗi lần (`page` và `limit`).
- **Logic lọc:** Backend sử dụng toán tử `Op` của Sequelize để tìm kiếm theo khoảng giá (`Op.gte`, `Op.lte`) và theo danh mục.

### B. Biến thể sản phẩm (Product Variants)
- **Logic xử lý:** Client sẽ theo dõi trạng thái `selectedColor` và `selectedSize`. Hệ thống sẽ tìm trong mảng `variants` xem có đối tượng nào khớp với cả 2 lựa chọn đó không để cập nhật Ảnh và Giá. Nếu không khớp hoặc tồn kho = 0, nút "Thêm vào giỏ" sẽ bị khóa.

---

## 5. CÁC CÂU HỎI PHẢN BIỆN THƯỜNG GẶP (Q&A)

**Câu 1: Tại sao bạn lại sử dụng JWT thay vì Session/Cookie truyền thống?**
*Trả lời:* JWT giúp hệ thống **Stateless** (Server không cần lưu trạng thái người dùng), giúp dễ dàng mở rộng quy mô (Scale) và phù hợp cho các ứng dụng chạy đa nền tảng (Web, Mobile dùng chung API).

**Câu 2: Cơ chế xử lý khi có hàng ngàn người cập nhật giỏ hàng cùng lúc là gì?**
*Trả lời:* Hệ thống sử dụng Sequelize để đảm bảo tính nhất quán của dữ liệu. Trong tương lai, có thể sử dụng thêm Transaction để đảm bảo các thao tác trừ kho hàng diễn ra chính xác.

**Câu 3: Làm thế nào để trang web của bạn load nhanh ngay cả khi có nhiều ảnh?**
*Trả lời:* Tôi đã sử dụng kỹ thuật **Skeleton Loading** (hiển thị khung sườn trước khi load xong) để tạo cảm giác trang web phản hồi tức thì, tránh tình trạng màn hình trắng gây khó chịu cho người dùng.

**Câu 4: Bạn xử lý Responsive cho thiết bị di động như thế nào?**
*Trả lời:* Sử dụng **CSS Grid** và **Media Queries**. Các thành phần như Sidebar ở desktop sẽ chuyển thành hàng ngang ở mobile để tối ưu không gian hiển thị.

---

## 6. ĐIỂM TỰ HÀO/SÁNG TẠO CỦA ĐỒ ÁN
- Giao diện thiết kế theo phong cách **Premium Store**, chú trọng vào trải nghiệm thị giác.
- Hệ thống **Seeding dữ liệu tự động**: Giúp dữ liệu luôn sẵn sàng mà không cần nhập tay thủ công.
- Logic **Variant thông minh**: Xử lý được các thuộc tính phức tạp của sản phẩm công nghệ.

---
*Chúc bạn bình tĩnh, tự tin và bảo vệ đồ án thành công đạt điểm cao!*
