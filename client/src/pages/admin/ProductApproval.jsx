import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/admin/products/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chờ duyệt:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Xác nhận duyệt sản phẩm này?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/admin/products/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Đã duyệt sản phẩm thành công!');
      fetchPendingProducts();
    } catch (error) {
      alert('Lỗi khi duyệt sản phẩm');
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) return alert('Vui lòng nhập lý do từ chối');
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/admin/products/${rejectId}/reject`, 
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Đã từ chối sản phẩm và gửi email thông báo.');
      setRejectId(null);
      setRejectReason('');
      fetchPendingProducts();
    } catch (error) {
      alert('Lỗi khi từ chối sản phẩm');
    }
  };

  if (loading) return <div className="admin-content">Đang tải dữ liệu...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="topbar-title">Duyệt sản phẩm mới</h2>
          <p className="admin-page-header-meta">Kiểm kê và cho phép hiển thị sản phẩm từ các Seller</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">Danh sách chờ duyệt ({products.length})</div>
        </div>
        <div className="admin-card-body-zero">
          {products.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
              <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
              Hiện không có sản phẩm nào cần duyệt
            </div>
          ) : (
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Người bán</th>
                    <th>Danh mục</th>
                    <th>Giá cơ bản</th>
                    <th className="text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id}>
                      <td>
                        <div className="td-avatar-row">
                          <img 
                            src={prod.images?.[0]?.image_url ? `http://localhost:3000/${prod.images[0].image_url}` : 'https://via.placeholder.com/44'} 
                            alt="" 
                            className="admin-product-img" 
                          />
                          <div className="product-name-cell">{prod.name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="customer-name-cell">{prod.seller?.name}</div>
                        <div className="customer-id-cell">{prod.seller?.email}</div>
                      </td>
                      <td>{prod.category?.name}</td>
                      <td className="td-price">{Number(prod.base_price).toLocaleString('vi-VN')}đ</td>
                      <td>
                        <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                          <button 
                            className="admin-btn admin-btn-sm admin-btn-primary"
                            onClick={() => handleApprove(prod.id)}
                          >
                            <i className="bi bi-check-lg"></i> Duyệt
                          </button>
                          <button 
                            className="admin-btn admin-btn-sm admin-btn-danger"
                            onClick={() => setRejectId(prod.id)}
                          >
                            <i className="bi bi-x-lg"></i> Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal (Simple Implementation) */}
      {rejectId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="admin-card" style={{ width: '400px' }}>
            <div className="admin-card-header">
              <div className="admin-card-title">Lý do từ chối</div>
              <button onClick={() => setRejectId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="admin-card-body">
              <textarea 
                className="admin-form-control" 
                placeholder="Nhập lý do chi tiết..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{ height: '120px', marginBottom: '1rem' }}
              ></textarea>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button className="admin-btn admin-btn-outline" onClick={() => setRejectId(null)}>Hủy</button>
                <button className="admin-btn admin-btn-danger" onClick={handleRejectSubmit}>Xác nhận từ chối</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductApproval;
