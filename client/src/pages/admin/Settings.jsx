import React from 'react';

const Settings = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Cài đặt hệ thống</h1>
      </div>
      
      <div className="admin-card">
        <h3 style={{fontWeight: 600, fontSize: 16, marginBottom: 16}}>Thông tin cửa hàng</h3>
        <div style={{maxWidth: 500}}>
          <div className="admin-input-group">
            <label className="admin-label">Tên cửa hàng</label>
            <input type="text" className="admin-input" defaultValue="ShopFlow" />
          </div>
          <div className="admin-input-group">
            <label className="admin-label">Email liên hệ</label>
            <input type="email" className="admin-input" defaultValue="contact@shopflow.com" />
          </div>
          <div className="admin-input-group">
            <label className="admin-label">Số điện thoại</label>
            <input type="text" className="admin-input" defaultValue="0123456789" />
          </div>
          <button className="admin-btn admin-btn-primary mt-4">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
