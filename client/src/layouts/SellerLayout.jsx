import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/admin/admin.css';

const SellerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || (path !== '/seller' && location.pathname.startsWith(path));
  };

  return (
    <div className="admin-wrapper" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ position: 'fixed', height: '100vh' }}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-text">Shop<span>Flow</span></div>
          <div className="sidebar-logo-sub">Seller Panel</div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Tổng quan</div>
          <Link to="/seller" className={`sidebar-link ${location.pathname === '/seller' ? 'active' : ''}`}>
            <i className="bi bi-grid-1x2"></i> Dashboard
          </Link>
          
          <div className="sidebar-section-label">Quản lý</div>
          <Link to="/seller/products" className={`sidebar-link ${isActive('/seller/products') ? 'active' : ''}`}>
            <i className="bi bi-box-seam"></i> Sản phẩm
          </Link>
          <Link to="#" className="sidebar-link">
            <i className="bi bi-receipt"></i> Đơn hàng
          </Link>
          <Link to="#" className="sidebar-link">
            <i className="bi bi-folder2"></i> Danh mục
          </Link>
          
          <div className="sidebar-section-label">Hệ thống</div>
          <Link to="/" className="sidebar-link"><i className="bi bi-arrow-left"></i> Về trang chủ</Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">SE</div>
            <div>
              <div className="sidebar-user-name">Seller</div>
              <div className="sidebar-user-role">Cửa hàng</div>
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
          <div className="topbar-title">Seller Hub</div>
          <div className="topbar-actions">
            <div className="admin-search">
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Tìm kiếm..." />
            </div>
            <button className="topbar-btn"><i className="bi bi-bell"></i><span className="topbar-badge"></span></button>
            <div className="topbar-user">
              <div className="topbar-avatar">SE</div>
              <span className="topbar-name">Seller Center</span>
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

export default SellerLayout;
