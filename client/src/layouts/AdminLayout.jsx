import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/admin/admin.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
  };

  return (
    <div className="admin-wrapper" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ position: 'fixed', height: '100vh' }}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-text">Shop<span>Flow</span></div>
          <div className="sidebar-logo-sub">Administrator</div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Hệ thống</div>
          <Link to="/admin" className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <i className="bi bi-speedometer2"></i> Tổng quan
          </Link>
          
          <div className="sidebar-section-label">Quản trị</div>
          <Link to="/admin/users" className={`sidebar-link ${isActive('/admin/users') ? 'active' : ''}`}>
            <i className="bi bi-people"></i> Người dùng
          </Link>
          <Link to="/admin/products" className={`sidebar-link ${isActive('/admin/products') ? 'active' : ''}`}>
            <i className="bi bi-check-circle"></i> Duyệt sản phẩm
          </Link>
          <Link to="#" className="sidebar-link">
            <i className="bi bi-folder2"></i> Danh mục
          </Link>
          
          <div className="sidebar-section-label">Khác</div>
          <Link to="/" className="sidebar-link"><i className="bi bi-arrow-left"></i> Về trang chủ</Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">AD</div>
            <div>
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Quản trị viên</div>
            </div>
            <button onClick={handleLogout} className="sidebar-logout-link" style={{ background: 'none', border: 'none', padding: 0 }}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, marginLeft: 'var(--sidebar-w)', width: 'calc(100% - var(--sidebar-w))' }}>
        <header className="admin-topbar">
          <div className="topbar-title">Admin Dashboard</div>
          <div className="topbar-actions">
            <div className="admin-search">
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Tìm kiếm..." />
            </div>
            <button className="topbar-btn"><i className="bi bi-bell"></i><span className="topbar-badge"></span></button>
            <div className="topbar-user">
              <div className="topbar-avatar">AD</div>
              <span className="topbar-name">Admin Center</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
