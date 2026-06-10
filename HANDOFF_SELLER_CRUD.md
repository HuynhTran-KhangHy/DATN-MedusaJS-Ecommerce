# HANDOFF: CẬP NHẬT DATABASE & SELLER CRUD UI

## 1. Trạng Thái Hệ Thống
- **Database**: Đã đồng bộ thành công (` sequelize.sync({ alter: true })`). Xử lý triệt để các xung đột chữ hoa/chữ thường trên Hosting Linux.
- **Backend**: Đã hoàn thiện API CRUD sản phẩm, hỗ trợ Biến thể (Variants) và Upload nhiều ảnh (Multer).
- **Frontend**: Đã nâng cấp lên giao diện **ShopFlow Premium** cho toàn bộ khu vực Seller Dashboard.

---

## 2. Các Công Việc Đã Hoàn Thành

### A. Sửa lỗi Database (Critical)
- **Vấn đề**: Lỗi `Table 'products' already exists` do hosting Linux phân biệt `Products` (chứa dữ liệu) và `products` (bảng trống do Sequelize tự tạo).
- **Giải pháp**: 
    - Đã dọn dẹp các bảng trống trùng tên.
    - Đồng bộ hóa Model sang **PascalCase** (`Users`, `Products`, `Categories`) để khớp với dữ liệu thực tế.
    - Xử lý lỗi `0000-00-00` bằng cách gán `CURRENT_TIMESTAMP` mặc định cho các cột thời gian.
    - Tạm thời nới lỏng ràng buộc `slug` (nullable) để đồng bộ dữ liệu cũ chưa có slug.

### B. Giao diện Quản lý Sản phẩm (Seller CRUD)
- **UI Styling**: Sử dụng bộ code CSS của ShopFlow Admin để tạo cảm giác chuyên nghiệp (Sidebar, Topbar, Admin Cards).
- **Trang Danh sách**: 
    - Bảng hiển thị thông tin trực quan: Ảnh, Danh mục, Tổng kho, Giá.
    - Hệ thống lọc (Filter) và tìm kiếm đẹp mắt.
- **Trang Thêm/Sửa**: 
    - Form chia Layout 2 cột (Thông tin chính & Sidebar trạng thái/ảnh).
    - **Variants**: Thêm/xóa biến thể động ngay trên form.
    - **Images**: Chế độ Upload nhiều ảnh, có Preview và nút xóa ảnh tức thời.

---

## 3. Cấu trúc File Quan Trọng
- `server/controllers/product.controller.js`: Xử lý logic CRUD phức tạp kèm logic `bulkCreate` cho Variants và Images.
- `server/routes/product.routes.js`: Định cấu hình Multer để nhận tối đa 5 ảnh.
- `client/src/layouts/SellerLayout.jsx`: Layout chính của dashboard (Isolated CSS).
- `client/src/pages/seller/ProductList.jsx`: Dashboard quản lý.
- `client/src/pages/seller/AddProduct.jsx` & `EditProduct.jsx`: Form nhập liệu.

---

## 4. Lưu ý cho Member Tiếp Theo (Next Steps)
1. **Dữ liệu cũ (Legacy Data)**: Hiện tại `slug` đang cho phép Null để tránh lỗi đồng bộ. Cần cập nhật `slug` cho các sản phẩm cũ và sau đó đặt lại `allowNull: false` trong Model để đảm bảo SEO.
2. **Authentication**: Form hiện tại đang fix cứng `seller_id = 1`. Cần tích hợp Auth Middleware để lấy ID người dùng từ Token.
3. **Image Cleanup**: Khi xóa sản phẩm, hệ thống mới chỉ xóa record trong DB. Cần thêm logic xóa file vật lý trong thư mục `server/uploads` để tiết kiệm tài nguyên.
