import React from 'react';

const Customers = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Khách hàng</h1>
      </div>
      <div className="admin-empty-state admin-card">
        <i className="bi bi-people admin-empty-icon"></i>
        <h3 style={{fontWeight: 600, fontSize: 16, marginBottom: 8}}>Chưa có dữ liệu khách hàng</h3>
        <p className="text-muted text-sm">Khách hàng đăng ký tài khoản sẽ xuất hiện tại đây.</p>
      </div>
    </div>
  );
};

export default Customers;
