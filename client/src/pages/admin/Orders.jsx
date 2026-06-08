import React from 'react';

const Orders = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Đơn hàng</h1>
      </div>
      <div className="admin-empty-state admin-card">
        <i className="bi bi-cart-x admin-empty-icon"></i>
        <h3 style={{fontWeight: 600, fontSize: 16, marginBottom: 8}}>Chưa có đơn hàng nào</h3>
        <p className="text-muted text-sm">Các đơn hàng mới từ khách hàng sẽ hiển thị tại đây.</p>
      </div>
    </div>
  );
};

export default Orders;
