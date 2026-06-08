import React, { useState } from 'react';

const Products = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Sản phẩm</h1>
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
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{width: 40}}><input type="checkbox" /></th>
                <th>Tên sản phẩm</th>
                <th>Phân loại</th>
                <th>Tồn kho</th>
                <th>Giá bán</th>
                <th>Trạng thái</th>
                <th style={{textAlign: 'right'}}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="flex items-center gap-4">
                    <div style={{width: 32, height: 32, background: 'var(--admin-border)', borderRadius: 4, overflow: 'hidden'}}>
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <span style={{fontWeight: 500}}>Sony WH-1000XM5</span>
                  </div>
                </td>
                <td>Tai nghe</td>
                <td>45</td>
                <td>8.490.000 đ</td>
                <td><span className="admin-badge admin-badge-success">Published</span></td>
                <td style={{textAlign: 'right'}}>
                  <button className="btn-icon" style={{width: 32, height: 32, marginLeft: 'auto'}}><i className="bi bi-three-dots"></i></button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="flex items-center gap-4">
                    <div style={{width: 32, height: 32, background: 'var(--admin-border)', borderRadius: 4, overflow: 'hidden'}}>
                      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <span style={{fontWeight: 500}}>Apple Watch Ultra 2</span>
                  </div>
                </td>
                <td>Smartwatch</td>
                <td>12</td>
                <td>19.990.000 đ</td>
                <td><span className="admin-badge admin-badge-gray">Draft</span></td>
                <td style={{textAlign: 'right'}}>
                  <button className="btn-icon" style={{width: 32, height: 32, marginLeft: 'auto'}}><i className="bi bi-three-dots"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between" style={{padding: '1rem 1.5rem', borderTop: '1px solid var(--admin-border)'}}>
          <div className="text-sm text-muted">Hiển thị 1 - 10 trong số 45 sản phẩm</div>
          <div className="flex gap-2">
            <button className="admin-btn admin-btn-secondary" disabled>Trước</button>
            <button className="admin-btn admin-btn-secondary">Sau</button>
          </div>
        </div>
      </div>

      {/* Mock Drawer */}
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
                  <option>Tai nghe</option>
                  <option>Điện thoại</option>
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
