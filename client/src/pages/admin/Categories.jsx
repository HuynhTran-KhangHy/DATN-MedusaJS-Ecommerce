import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý danh mục</h1>
        <div className="flex gap-2">
          <button className="admin-btn admin-btn-primary">
            <i className="bi bi-plus"></i>
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="admin-card" style={{padding: 0}}>
        <div className="admin-table-container" style={{margin: 0}}>
          {loading ? (
            <div style={{padding: '2rem', textAlign: 'center'}}>Đang tải dữ liệu...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{width: 60}}>ID</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Slug</th>
                  <th style={{textAlign: 'right'}}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td style={{fontWeight: 600}}>{cat.name}</td>
                    <td className="text-muted text-sm">{cat.description || 'Không có mô tả'}</td>
                    <td><code>{cat.slug}</code></td>
                    <td style={{textAlign: 'right'}}>
                      <div className="flex justify-end gap-1">
                        <button className="btn-icon" title="Sửa"><i className="bi bi-pencil"></i></button>
                        <button className="btn-icon text-danger" title="Xóa"><i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center', padding: '3rem'}}>
                      <div className="admin-empty-state" style={{border: 'none', boxShadow: 'none'}}>
                        <i className="bi bi-tags admin-empty-icon"></i>
                        <p className="text-muted">Chưa có danh mục nào.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
