import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Tổng quan</h1>
        <div className="flex gap-2">
          <button className="admin-btn admin-btn-secondary">
            <i className="bi bi-calendar"></i>
            Hôm nay
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="admin-card w-full">
          <div className="text-muted text-sm mb-2">Tổng doanh thu</div>
          <div style={{fontSize: 24, fontWeight: 700}}>124.500.000 đ</div>
          <div className="text-sm mt-4"><span className="admin-badge admin-badge-success">+12%</span> <span className="text-muted ml-2">so với tuần trước</span></div>
        </div>
        <div className="admin-card w-full">
          <div className="text-muted text-sm mb-2">Đơn hàng mới</div>
          <div style={{fontSize: 24, fontWeight: 700}}>45</div>
          <div className="text-sm mt-4"><span className="admin-badge admin-badge-success">+5%</span> <span className="text-muted ml-2">so với tuần trước</span></div>
        </div>
        <div className="admin-card w-full">
          <div className="text-muted text-sm mb-2">Khách hàng mới</div>
          <div style={{fontSize: 24, fontWeight: 700}}>12</div>
          <div className="text-sm mt-4"><span className="admin-badge admin-badge-warning">-2%</span> <span className="text-muted ml-2">so với tuần trước</span></div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{fontWeight: 600, marginBottom: '1.5rem', fontSize: 16}}>Đơn hàng gần đây</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{fontWeight: 500}}>#ORD-001</td>
                <td>Nguyễn Văn A</td>
                <td>08/06/2026</td>
                <td>12.500.000 đ</td>
                <td><span className="admin-badge admin-badge-success">Đã giao</span></td>
              </tr>
              <tr>
                <td style={{fontWeight: 500}}>#ORD-002</td>
                <td>Trần Thị B</td>
                <td>07/06/2026</td>
                <td>8.990.000 đ</td>
                <td><span className="admin-badge admin-badge-warning">Đang xử lý</span></td>
              </tr>
              <tr>
                <td style={{fontWeight: 500}}>#ORD-003</td>
                <td>Lê Văn C</td>
                <td>06/06/2026</td>
                <td>24.000.000 đ</td>
                <td><span className="admin-badge admin-badge-gray">Chờ thanh toán</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
