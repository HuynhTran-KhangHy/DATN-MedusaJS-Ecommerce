# 🚀 ShopFlow - Project Handoff

**Dự án:** DATN-MedusaJS-Ecommerce (ShopFlow)
**Cập nhật lần cuối:** 08/06/2026

Đây là tài liệu bàn giao tổng quát về cấu trúc, trạng thái hiện tại của dự án và các bước tiếp theo để nhóm phát triển có thể dễ dàng tiếp nhận và tiếp tục làm việc.

---

## 🏗️ 1. Kiến trúc dự án (Architecture)

Dự án được chia thành 2 phần độc lập (Monorepo cơ bản):

### Backend (`/server`)
- **Công nghệ:** Node.js, Express.js, Sequelize (ORM).
- **Cơ sở dữ liệu:** MySQL (Được lưu trữ trên Hosting từ xa - `202.92.5.23`).
- **Trạng thái:** Đã thiết lập xong bộ khung server cơ bản và kết nối thành công đến Remote Database thông qua file cấu hình `.env`.

### Frontend (`/client`)
- **Công nghệ:** React.js, Vite, React Router DOM.
- **Phong cách thiết kế:** 
  - Giao diện Client được mô phỏng từ template tĩnh (HTML/CSS), sử dụng font **Montserrat** (Heading) và **Inter** (Body) nhằm tối ưu hoá tiếng Việt.
  - Giao diện Admin được thiết kế hoàn toàn mới theo phong cách **MedusaJS Admin** (tối giản, chuyên nghiệp, hỗ trợ responsive).
- **Cấu trúc thư mục `/client/src`:**
  - `assets/css/`: Chứa `client/style.css` (CSS gốc của ShopFlow) và `admin/admin-style.css` (CSS Design System cho Admin).
  - `components/`: Chứa `Header.jsx`, `Footer.jsx`, `admin/Sidebar.jsx`, `admin/Topbar.jsx`.
  - `layouts/`: `MainLayout.jsx` (Client), `AdminLayout.jsx` (Admin).
  - `pages/`: Chứa các trang hiển thị như `Home.jsx`, `Cart.jsx`, và thư mục con `admin/` chứa các trang quản trị (`Dashboard`, `Products`, `Orders`...).

---

## ⚙️ 2. Hướng dẫn cài đặt & Khởi chạy (Local Development)

Để chạy dự án trên bất kỳ máy tính nào, yêu cầu máy phải cài đặt sẵn **Node.js**.

### A. Chạy Backend (Server)
1. Mở Terminal và di chuyển vào thư mục server:
   ```bash
   cd server
   ```
2. Cài đặt các thư viện (nếu chưa cài):
   ```bash
   npm install
   ```
3. **Quan trọng:** Tạo file `.env` ngang hàng với file `server/index.js` và thêm thông tin sau:
   ```env
   PORT=3000
   DB_HOST=202.92.5.23
   DB_PORT=3306
   DB_NAME=uxjyooqvhosting_datn_medusajs
   DB_USER=uxjyooqvhosting_user_medusajs
   DB_PASS=^IEVCc3s@P%c|gb
   ```
4. Khởi chạy Server:
   ```bash
   npm run dev
   ```

### B. Chạy Frontend (Client)
1. Mở một Terminal MỚI và di chuyển vào thư mục client:
   ```bash
   cd client
   ```
2. Cài đặt các thư viện React:
   ```bash
   npm install
   ```
3. Khởi chạy Frontend:
   ```bash
   npm run dev
   ```
4. Truy cập giao diện:
   - Client UI: `http://localhost:5173`
   - Admin UI: `http://localhost:5173/admin/dashboard`

---

## 🎯 3. Các công việc đã hoàn thành

- [x] Thiết lập cấu trúc Frontend bằng Vite và cấu hình React Router.
- [x] Chuyển đổi toàn bộ HTML/CSS tĩnh của trang **Trang chủ** và **Giỏ hàng** sang component React.
- [x] Sửa lỗi font chữ, chuyển sang dùng `Montserrat` và `Inter` để không bị lỗi dấu tiếng Việt, fix lỗi tràn chữ (line-height).
- [x] Thiết kế và xây dựng trọn bộ UI **Admin Dashboard** (Sidebar thu gọn, Navbar, Breadcrumb, Boilerplate cho 6 modules).
- [x] Khởi tạo backend Node.js.
- [x] Kết nối backend với MySQL Hosting thành công. Xử lý triệt để lỗi `ER_ACCESS_DENIED_ERROR` cho môi trường clone của team.
- [x] **[Trần Hoàng Nguyện]** Xây dựng UI trang Checkout, tích hợp gọi API Giao Hàng Nhanh (GHN) lấy danh sách địa giới hành chính và tính phí vận chuyển theo thời gian thực.
- [x] **[Trần Hoàng Nguyện]** Thiết kế Model `Order`, `OrderItem` và tạo API `POST /api/orders` xử lý đặt hàng an toàn với transaction.
- [x] **[Trần Hoàng Nguyện]** Khởi tạo hệ thống Hàng đợi (Queue) bằng `BullMQ` và `Redis` (Upstash) để xử lý `ProcessOrderJob` dưới background.

---

## 🚀 4. Các bước tiếp theo (Next Steps)

Để hoàn thiện dự án, dưới đây là các công việc mà team cần thực hiện trong các sprint tới:

### Về phía Frontend (Client UI)
1. Cắt tiếp các trang HTML còn lại sang React Component (Ví dụ: `Products.jsx` - Danh sách sản phẩm, `ProductDetail.jsx` - Chi tiết).
2. Xây dựng logic State Management (sử dụng Context API hoặc Redux) để quản lý dữ liệu **Giỏ hàng (Cart)** và **Tài khoản (User)**.

### Về phía Backend
1. **Thiết kế Database Schema (Models):** Định nghĩa các bảng thực tế thông qua Sequelize (Users, Products, Categories, Orders, OrderItems...).
2. **Xây dựng API RESTful:**
   - Auth APIs (Đăng nhập, Đăng ký, JWT).
   - Product APIs (Lọc, tìm kiếm, phân trang).
   - Order APIs (Tích hợp cổng thanh toán MoMo / ZaloPay).
3. **Kết nối API (Integration):** Dùng `axios` (đã có bên frontend) để gọi dữ liệu thật từ Backend đổ lên giao diện Client và Admin thay vì dùng dữ liệu giả (Mock data).

---
*Tài liệu này được lưu tại thư mục gốc của dự án để tất cả các thành viên trong nhóm DATN có thể tiện theo dõi tiến độ.*
