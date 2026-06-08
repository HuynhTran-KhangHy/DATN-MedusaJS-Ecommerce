import React from 'react';

const Categories = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Danh mục</h1>
        <div className="flex gap-2">
          <button className="admin-btn admin-btn-primary">
            <i className="bi bi-plus"></i>
            Thêm danh mục
          </button>
        </div>
      </div>
      <div className="admin-empty-state admin-card">
        <i className="bi bi-tags admin-empty-icon"></i>
        <h3 style={{fontWeight: 600, fontSize: 16, marginBottom: 8}}>Quản lý danh mục</h3>
        <p className="text-muted text-sm">Chưa có danh mục nào. Hãy tạo danh mục đầu tiên.</p>
      </div>
    </div>
  );
};

export default Categories;
