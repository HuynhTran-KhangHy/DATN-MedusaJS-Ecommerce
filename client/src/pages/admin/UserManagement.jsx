import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, sellers: 0, locked: 0 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      
      // Tính toán thống kê
      const sellers = response.data.filter(u => u.role === 2).length;
      const locked = response.data.filter(u => u.status === 0).length;
      setStats({ total: response.data.length, sellers, locked });
      
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách user:', error);
      alert('Không thể tải danh sách người dùng. Vui lòng kiểm tra quyền Admin!');
      setLoading(false);
    }
  };

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.status === 1 ? 0 : 1;
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/admin/users/${user.id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
    }
  };

  const toggleRole = async (user) => {
    try {
      // Nếu là Buyer (0) -> Seller (2), ngược lại Seller (2) -> Buyer (0)
      const newRole = user.role === 0 ? 2 : 0;
      const confirmMsg = newRole === 2 
        ? `Cấp quyền Seller cho ${user.name}?` 
        : `Thu hồi quyền Seller của ${user.name}?`;
      
      if (!window.confirm(confirmMsg)) return;

      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/admin/users/${user.id}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Lỗi khi cập nhật vai trò');
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 1: return <span className="status-badge badge-shipped">Admin</span>;
      case 2: return <span className="status-badge badge-processing">Seller</span>;
      default: return <span className="status-badge badge-inactive">Người mua</span>;
    }
  };

  if (loading) return <div className="admin-content">Đang tải dữ liệu...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="topbar-title">Quản lý người dùng</h2>
          <p className="admin-page-header-meta">Quản lý phân quyền và trạng thái hoạt động của thành viên</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon dark"><i className="bi bi-people"></i></div>
          <div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Tổng thành viên</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><i className="bi bi-shop"></i></div>
          <div>
            <div className="stat-value">{stats.sellers}</div>
            <div className="stat-label">Người bán (Sellers)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><i className="bi bi-person-x"></i></div>
          <div>
            <div className="stat-value">{stats.locked}</div>
            <div className="stat-label">Đang bị khóa</div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">Danh sách thành viên</div>
          <div className="admin-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Tìm kiếm theo tên/email..." />
          </div>
        </div>
        <div className="admin-card-body-zero">
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Ngày tham gia</th>
                  <th className="text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="td-avatar-row">
                        <div className="review-avatar">
                          {user.avatar ? <img src={user.avatar} alt="" style={{width: '100%', height:'100%', borderRadius:'50%'}} /> : user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="customer-name-cell">{user.name}</div>
                          <div className="customer-id-cell">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      {user.status === 1 ? (
                        <span className="status-badge badge-active">Hoạt động</span>
                      ) : (
                        <span className="status-badge badge-cancelled">Bị khóa</span>
                      )}
                    </td>
                    <td className="td-muted">{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <div className="action-btns" style={{justifyContent: 'flex-end'}}>
                        {user.role !== 1 && (
                          <>
                            <button 
                              className={`admin-btn admin-btn-sm ${user.role === 2 ? 'admin-btn-outline' : 'admin-btn-primary'}`}
                              onClick={() => toggleRole(user)}
                              title={user.role === 2 ? "Thu hồi quyền Seller" : "Cấp quyền Seller"}
                            >
                              <i className={`bi ${user.role === 2 ? 'bi-person-dash' : 'bi-person-plus'}`}></i>
                              {user.role === 2 ? 'Hủy Seller' : 'Cấp Seller'}
                            </button>
                            
                            <button 
                              className={`action-btn ${user.status === 1 ? 'delete' : 'view'}`}
                              onClick={() => toggleStatus(user)}
                              title={user.status === 1 ? "Khóa tài khoản" : "Mở tài khoản"}
                            >
                              <i className={`bi ${user.status === 1 ? 'bi-lock' : 'bi-unlock'}`}></i>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
