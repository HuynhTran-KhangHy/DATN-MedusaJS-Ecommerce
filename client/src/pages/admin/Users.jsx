import React from 'react';

const Users = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Nhân viên</h1>
        <button className="admin-btn admin-btn-primary">
          <i className="bi bi-person-plus"></i>
          Thêm nhân viên
        </button>
      </div>
      <div className="admin-empty-state admin-card">
        <i className="bi bi-person-badge admin-empty-icon"></i>
        <h3 style={{fontWeight: 600, fontSize: 16, marginBottom: 8}}>Chưa có nhân viên nào khác</h3>
        <p className="text-muted text-sm">Thêm nhân viên để cấp quyền quản trị hệ thống.</p>
      </div>
    </div>
  );
};

export default Users;
