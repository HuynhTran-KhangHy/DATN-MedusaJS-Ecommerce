import React from 'react';

const Customers = () => {
  const mockCustomers = [
    { id: 1, name: 'Lê Kiều Biên', email: 'bienle@example.com', phone: '0987654321', orders: 5, totalSpent: 12500000, joined: '12/06/2026', avatar: null },
    { id: 2, name: 'Nguyễn Văn A', email: 'anv@example.com', phone: '0123456789', orders: 2, totalSpent: 3400000, joined: '10/06/2026', avatar: null },
    { id: 3, name: 'Trần Thị B', email: 'btt@example.com', phone: '0909090909', orders: 0, totalSpent: 0, joined: '11/06/2026', avatar: null },
    { id: 4, name: 'Hoàng Văn C', email: 'chv@example.com', phone: '0888776655', orders: 12, totalSpent: 45000000, joined: '01/05/2026', avatar: null },
    { id: 5, name: 'Phạm Minh D', email: 'dpm@example.com', phone: '0777665544', orders: 1, totalSpent: 150000, joined: '13/06/2026', avatar: null },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  return (
    <div className="admin-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Quản lý Khách hàng</h1>
          <p className="text-muted text-sm">Danh sách tất cả khách hàng đã đăng ký trên hệ thống</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-outline btn-sm"><i className="bi bi-download"></i> Xuất Excel</button>
          <button className="btn btn-primary btn-sm"><i className="bi bi-plus-lg"></i> Thêm khách hàng</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-filters">
          <div className="search-box" style={{ maxWidth: '300px' }}>
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Tìm kiếm khách hàng..." />
          </div>
          <select className="price-input" style={{ width: '180px', height: '40px' }}>
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="blocked">Đã chặn</option>
          </select>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}><input type="checkbox" /></th>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Số đơn</th>
                <th>Tổng chi tiêu</th>
                <th>Ngày gia nhập</th>
                <th style={{ width: '100px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map(customer => (
                <tr key={customer.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="admin-product-item">
                      <div className="admin-product-img" style={{ borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <i className="bi bi-person" style={{ fontSize: '1.2rem', color: '#999' }}></i>
                      </div>
                      <div className="admin-product-info">
                        <div className="admin-product-name">{customer.name}</div>
                        <div className="text-xs text-muted">ID: #CUS-{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-xs text-muted">{customer.phone}</div>
                  </td>
                  <td>{customer.orders}</td>
                  <td className="fw-700 text-accent">{formatPrice(customer.totalSpent)}</td>
                  <td className="text-sm">{customer.joined}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" title="Xem chi tiết"><i className="bi bi-eye"></i></button>
                      <button className="admin-action-btn" title="Chặn người dùng"><i className="bi bi-slash-circle"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <div className="text-xs text-muted">Hiển thị {mockCustomers.length} trên 48 khách hàng</div>
          <div className="pagination-btns">
            <button className="btn-icon" disabled><i className="bi bi-chevron-left"></i></button>
            <button className="btn-icon active">1</button>
            <button className="btn-icon">2</button>
            <button className="btn-icon">3</button>
            <button className="btn-icon"><i className="bi bi-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
