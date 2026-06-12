# HANDOFF: QUẢN LÝ NGƯỜI DÙNG (ADMIN USER MANAGEMENT - PB-11)

## 1. Trạng Thái Hệ Thống
- **Phân quyền (Auth & Roles)**: Đã triển khai hệ thống Middleware bảo mật.
    - `0`: Buyer (Người mua - mặc định)
    - `1`: Admin (Quản trị viên)
    - `2`: Seller (Người bán)
- **Backend**: Đã hoàn thiện các endpoint quản trị tại `/api/admin`.
- **Frontend**: Đã có Layout Admin riêng biệt và trang quản lý người dùng chuyên sâu.

---

## 2. Các Công Việc Đã Hoàn Thành

### A. Hệ thống Middleware (Security)
- **`authMiddleware`**: Xác thực Token JWT gửi kèm Header `Authorization`. Gán thông tin người dùng vào `req.user`.
- **`adminMiddleware`**: Chặn các truy cập không phải role `1`. Đảm bảo các API quản trị chỉ Admin mới gọi được.

### B. Quản lý Người dùng (PB-11)
- **Giao diện Admin Dashboard**:
    - Sử dụng `AdminLayout` với Sidebar tối màu, hỗ trợ định vị Menu hoạt động (Active state).
    - Thẻ thống kê (Stats): Tổng user, số Seller, số user bị khóa.
- **Tính năng lọc & hiển thị**:
    - Bảng danh sách thành viên với Avatar, Badge vai trò (Admin/Seller/Buyer) và trạng thái.
- **Tính năng tương tác (Real-time update)**:
    - **Khóa/Mở tài khoản**: Nút bấm thay đổi trạng thái user tức thì trong Database.
    - **Quản lý quyền Seller**: Cho phép nâng cấp User lên Seller hoặc hạ cấp ngược lại.

---

## 3. Cấu trúc File Mới
### Backend
- `server/middleware/auth.middleware.js`: Middleware xác thực JWT.
- `server/middleware/admin.middleware.js`: Middleware kiểm tra quyền Quản trị.
- `server/controllers/admin.controller.js`: Xử lý logic lấy danh sách, update role/status.
- `server/routes/admin.routes.js`: Định nghĩa các endpoint `/users`, `/users/:id/status`, `/users/:id/role`.

### Frontend
- `client/src/layouts/AdminLayout.jsx`: Layout khung cho khu vực Admin.
- `client/src/pages/admin/UserManagement.jsx`: Trang quản lý thành viên chính (Call API & Render Table).

---

## 4. Lưu ý cho Member Tiếp Theo (Next Steps)
1.  **Duyệt Sản phẩm (PB-10)**: 
    - Cần kế thừa `AdminLayout` đã tạo để làm trang Duyệt sản phẩm.
    - Sử dụng `adminAuth` middleware cho các API duyệt sản phẩm mới.
    - Tích hợp Nodemailer để gửi thông báo khi Admin thực hiện Duyệt/Từ chối.
2.  **Cấp quyền Admin**: 
    - Hiện tại chưa có link trên UI để tạo Admin mới. Cần chỉnh sửa trực tiếp trong Database (set `role = 1`) cho tài khoản test để vào được khu vực này.
3.  **Search & Filter**: 
    - Thanh tìm kiếm trên giao diện User Management hiện mới chỉ là UI, cần viết thêm logic `filter` ở Frontend hoặc bổ sung `query` ở Backend.

---
**Người thực hiện**: Antigravity (AI Assistant)
**Ngày**: 12/06/2026
