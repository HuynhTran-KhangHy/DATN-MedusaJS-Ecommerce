import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header" style={{justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0' : '0 1.5rem'}}>
        <i className="bi bi-box-fill text-xl" style={{color: 'var(--admin-primary)', marginRight: isCollapsed ? 0 : 8}}></i>
        {!isCollapsed && <span>ShopFlow Admin</span>}
      </div>
      <nav className="admin-sidebar-nav">
        <NavLink to="/admin/dashboard" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Tổng quan">
          <i className="bi bi-grid admin-nav-icon"></i>
          {!isCollapsed && <span>Tổng quan</span>}
        </NavLink>
        <NavLink to="/admin/orders" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Đơn hàng">
          <i className="bi bi-cart admin-nav-icon"></i>
          {!isCollapsed && <span>Đơn hàng</span>}
        </NavLink>
        <NavLink to="/admin/products" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Sản phẩm">
          <i className="bi bi-box-seam admin-nav-icon"></i>
          {!isCollapsed && <span>Sản phẩm</span>}
        </NavLink>
        <NavLink to="/admin/categories" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Danh mục">
          <i className="bi bi-tags admin-nav-icon"></i>
          {!isCollapsed && <span>Danh mục</span>}
        </NavLink>
        <NavLink to="/admin/customers" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Khách hàng">
          <i className="bi bi-people admin-nav-icon"></i>
          {!isCollapsed && <span>Khách hàng</span>}
        </NavLink>
        <NavLink to="/admin/users" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Nhân viên">
          <i className="bi bi-person-badge admin-nav-icon"></i>
          {!isCollapsed && <span>Nhân viên</span>}
        </NavLink>
        <NavLink to="/admin/settings" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`} title="Cài đặt">
          <i className="bi bi-gear admin-nav-icon"></i>
          {!isCollapsed && <span>Cài đặt</span>}
        </NavLink>
      </nav>
      <div className="admin-sidebar-footer">
        <button 
          className="admin-nav-item w-full" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'}}
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        >
          <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'} admin-nav-icon`}></i>
          {!isCollapsed && <span>Thu gọn</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
