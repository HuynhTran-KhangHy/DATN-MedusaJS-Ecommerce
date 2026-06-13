import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 2: return <span className="admin-badge admin-badge-success">Đang bán</span>;
      case 1: return <span className="admin-badge admin-badge-warning">Chờ duyệt</span>;
      case 0: return <span className="admin-badge admin-badge-danger">Từ chối</span>;
      default: return <span className="admin-badge admin-badge-gray">Nháp</span>;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý sản phẩm</h1>
        <div className="flex gap-2">
          <button className="admin-btn admin-btn-secondary">
            <i className="bi bi-download"></i>
            Export
          </button>
          <button className="admin-btn admin-btn-primary" onClick={() => setDrawerOpen(true)}>
            <i className="bi bi-plus"></i>
            Thêm sản phẩm
          </button>
        </div>
      </div>

      <div className="admin-card" style={{padding: 0}}>
        <div className="flex items-center justify-between" style={{padding: '1rem 1.5rem', borderBottom: '1px solid var(--admin-border)'}}>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="admin-input" 
              placeholder="Tìm kiếm sản phẩm..." 
              style={{width: 300, marginBottom: 0}}
            />
            <button className="admin-btn admin-btn-secondary">
              <i className="bi bi-filter"></i> Lọc
            </button>
          </div>
        </div>

        <div className="admin-table-container" style={{margin: 0}}>
          {loading ? (
            <div style={{padding: '2rem', textAlign: 'center'}}>Đang tải dữ liệu...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{width: 40}}><input type="checkbox" /></th>
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Người bán</th>
                  <th>Giá gốc</th>
                  <th>Trạng thái</th>
                  <th style={{textAlign: 'right'}}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map(product => (
                  <tr key={product.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div style={{width: 40, height: 40, background: 'var(--admin-border)', borderRadius: 4, overflow: 'hidden', flexShrink: 0}}>
                          {product.images && product.images.length > 0 ? (
                            <img src={`http://localhost:3000${product.images[0].image_url}`} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted"><i className="bi bi-image"></i></div>
                          )}
                        </div>
                        <div>
                          <div style={{fontWeight: 600, color: 'var(--admin-text)'}}>{product.name}</div>
                          <div className="text-xs text-muted">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category?.name || 'Chưa phân loại'}</td>
                    <td>{product.seller?.name || 'N/A'}</td>
                    <td style={{fontWeight: 500}}>{formatPrice(product.base_price)}</td>
                    <td>{getStatusBadge(product.status)}</td>
                    <td style={{textAlign: 'right'}}>
                      <div className="flex justify-end gap-1">
                        <button className="btn-icon" title="Chi tiết"><i className="bi bi-eye"></i></button>
                        <button className="btn-icon" title="Chỉnh sửa"><i className="bi bi-pencil"></i></button>
                        <button className="btn-icon text-danger" title="Xóa"><i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" style={{textAlign: 'center', padding: '3rem'}}>
                      <div className="text-muted">Chưa có sản phẩm nào</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center justify-between" style={{padding: '1rem 1.5rem', borderTop: '1px solid var(--admin-border)'}}>
          <div className="text-sm text-muted">Hiển thị {products.length} sản phẩm</div>
          <div className="flex gap-2">
            <button className="admin-btn admin-btn-secondary" disabled>Trước</button>
            <button className="admin-btn admin-btn-secondary" disabled>Sau</button>
          </div>
        </div>
      </div>

      {/* Mock Drawer for Adding Product */}
      {isDrawerOpen && (
        <div className="admin-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="admin-drawer" onClick={e => e.stopPropagation()}>
            <div className="admin-dialog-header">
              <h2 className="admin-dialog-title">Thêm sản phẩm mới</h2>
              <button className="btn-icon" style={{width: 32, height: 32}} onClick={() => setDrawerOpen(false)}><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="admin-dialog-body">
              <div className="admin-input-group">
                <label className="admin-label">Tên sản phẩm</label>
                <input type="text" className="admin-input" placeholder="VD: AirPods Pro 2" />
              </div>
              <div className="admin-input-group">
                <label className="admin-label">Mô tả ngắn</label>
                <textarea className="admin-input" rows="3" placeholder="Nhập mô tả sản phẩm..."></textarea>
              </div>
              <div className="admin-input-group">
                <label className="admin-label">Giá bán</label>
                <input type="number" className="admin-input" placeholder="0 đ" />
              </div>
              <div className="admin-input-group">
                <label className="admin-label">Danh mục</label>
                <select className="admin-input">
                  <option>Chọn danh mục</option>
                  {/* Categories would be mapped here */}
                </select>
              </div>
            </div>
            <div className="admin-dialog-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setDrawerOpen(false)}>Hủy</button>
              <button className="admin-btn admin-btn-primary">Lưu sản phẩm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
