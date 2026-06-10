import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // For now, use a fixed seller_id or get from auth
      const response = await axios.get('http://localhost:3000/api/products/seller?seller_id=1');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi lấy danh sách sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      alert('Không thể xóa sản phẩm.');
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải...</div>;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-header-meta">Bạn đang có {products.length} sản phẩm</div>
        </div>
        <div className="admin-page-header-actions">
          <button className="admin-btn admin-btn-outline"><i className="bi bi-upload"></i> Import</button>
          <button className="admin-btn admin-btn-outline"><i className="bi bi-download"></i> Export</button>
          <Link to="/seller/products/add" className="admin-btn admin-btn-primary">
            <i className="bi bi-plus-lg"></i> Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <div className="filter-bar-body">
          <div className="filter-bar-row">
            <div className="admin-search" style={{ flex: 1, minWidth: '200px' }}>
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Tìm theo tên sản phẩm..." style={{ width: '100%' }} />
            </div>
            <select className="admin-form-control filter-select" style={{ width: '160px' }}>
              <option>Tất cả danh mục</option>
            </select>
            <select className="admin-form-control filter-select" style={{ width: '140px' }}>
              <option>Tất cả trạng thái</option>
              <option>Đang bán</option>
              <option>Ngừng kinh doanh</option>
            </select>
            <button className="admin-btn admin-btn-outline"><i className="bi bi-x"></i> Xóa lọc</button>
          </div>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">Danh sách sản phẩm</div>
        </div>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '36px' }}></th>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Hàng trong kho</th>
                <th>Giá cơ bản</th>
                <th>Trạng thái</th>
                <th style={{ width: '120px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">Chưa có sản phẩm nào</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td><input type="checkbox" className="admin-checkbox" /></td>
                    <td>
                      <div className="td-avatar-row">
                        <img 
                          src={product.images && product.images.length > 0 ? `http://localhost:3000${product.images[0].image_url}` : 'https://placehold.co/80x80?text=No+Image'} 
                          alt="" 
                          className="admin-product-img" 
                        />
                        <div>
                          <div className="product-name-cell">{product.name}</div>
                          <div className="product-sku-cell">ID: #{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="td-muted">{product.category?.name || 'Chưa phân loại'}</td>
                    <td className="td-muted">
                        {product.variants?.reduce((total, v) => total + v.stock, 0) || 0} sản phẩm
                    </td>
                    <td className="td-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.base_price)}</td>
                    <td>
                      <span className={`status-badge ${product.status === 1 ? 'badge-active' : 'badge-inactive'}`}>
                        {product.status === 1 ? 'Đang bán' : 'Tạm ẩn'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn view" title="Xem"><i className="bi bi-eye"></i></button>
                        <Link to={`/seller/products/edit/${product.id}`} className="action-btn edit" title="Sửa"><i className="bi bi-pencil"></i></Link>
                        <button onClick={() => handleDelete(product.id)} className="action-btn delete" title="Xóa"><i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-footer-info">Hiển thị {products.length} sản phẩm</span>
        </div>
      </div>
    </>
  );
};

export default ProductList;
