import React from 'react';

const Orders = () => {
  const mockOrders = [
    { id: 1025, customer: 'Lê Kiều Biên', total: 1250000, status: 'completed', payment: 'momo', items: 3, date: '12/06/2026 14:30' },
    { id: 1024, customer: 'Nguyễn Văn A', total: 450000, status: 'shipped', payment: 'cod', items: 1, date: '12/06/2026 09:15' },
    { id: 1023, customer: 'Khách vãng lai', total: 890000, status: 'processing', payment: 'cod', items: 2, date: '11/06/2026 21:05' },
    { id: 1022, customer: 'Trần Thị B', total: 2100000, status: 'pending', payment: 'vnpay', items: 5, date: '11/06/2026 18:45' },
    { id: 1021, customer: 'Hoàng Văn C', total: 150000, status: 'cancelled', payment: 'cod', items: 1, date: '10/06/2026 11:20' },
    { id: 1020, customer: 'Phạm Minh D', total: 3200000, status: 'completed', payment: 'momo', items: 2, date: '10/06/2026 08:00' },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'Chờ xác nhận', class: 'badge-pending' },
      processing: { label: 'Đang xử lý', class: 'badge-processing' },
      shipped: { label: 'Đang giao', class: 'badge-shipped' },
      completed: { label: 'Đã hoàn thành', class: 'badge-success' },
      cancelled: { label: 'Đã hủy', class: 'badge-danger' }
    };
    const s = statusMap[status] || { label: status, class: '' };
    return <span className={`admin-badge ${s.class}`}>{s.label}</span>;
  };

  const getPaymentBadge = (method) => {
    const methodMap = {
      cod: { label: 'Tiền mặt', icon: 'bi-truck' },
      momo: { label: 'MoMo', icon: 'bi-wallet2' },
      vnpay: { label: 'VNPay', icon: 'bi-credit-card' }
    };
    const m = methodMap[method] || { label: method, icon: 'bi-cash' };
    return (
      <div className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <i className={`bi ${m.icon}`}></i> {m.label}
      </div>
    );
  };

  return (
    <div className="admin-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Quản lý Đơn hàng</h1>
          <p className="text-muted text-sm">Xem và cập nhật trạng thái đơn hàng từ khách hàng</p>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-outline btn-sm"><i className="bi bi-funnel"></i> Lọc nâng cao</button>
          <button className="btn btn-primary btn-sm"><i className="bi bi-download"></i> Xuất báo cáo</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-filters">
          <div className="search-box" style={{ maxWidth: '300px' }}>
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Tìm mã đơn hàng, tên khách..." />
          </div>
          <div className="admin-filter-tabs">
            <button className="filter-tab active">Tất cả</button>
            <button className="filter-tab">Chờ xác nhận</button>
            <button className="filter-tab">Đang giao</button>
            <button className="filter-tab">Khiếu nại</button>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}><input type="checkbox" /></th>
                <th>Mã Đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Số món</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th style={{ width: '100px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="fw-700">#SF-{order.id}</div>
                    {getPaymentBadge(order.payment)}
                  </td>
                  <td>{order.customer}</td>
                  <td><div className="text-sm">{order.date}</div></td>
                  <td>{order.items} sản phẩm</td>
                  <td className="fw-700 text-accent">{formatPrice(order.total)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" title="Cập nhật trạng thái"><i className="bi bi-pencil-square"></i></button>
                      <button className="admin-action-btn" title="In hóa đơn"><i className="bi bi-printer"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <div className="text-xs text-muted">Hiển thị {mockOrders.length} trên 150 đơn hàng</div>
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

export default Orders;
