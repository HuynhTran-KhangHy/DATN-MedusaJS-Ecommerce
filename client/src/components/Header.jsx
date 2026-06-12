import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Cập nhật thông tin user mỗi khi thay đổi trang hoặc localStorage thay đổi
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Lắng nghe sự kiện storage (cho nhiều tab)
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location]); // Chạy lại mỗi khi đổi route để cập nhật UI login/logout

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Shop<span>Flow</span></Link>

      <ul className="navbar-nav">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Trang chủ</NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Sản phẩm</NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Tài khoản</NavLink>
        </li>
      </ul>

      <div className="navbar-actions">
        <button className="btn-icon" title="Tìm kiếm"><i className="bi bi-search"></i></button>
        <Link to="/cart" className="btn-icon pos-relative" title="Giỏ hàng">
          <i className="bi bi-bag"></i>
          {totalItems > 0 && <span className="badge-count cart-badge-count">{totalItems}</span>}
        </Link>
        <Link to="/profile" className="btn-icon" title="Cá nhân">
          {user?.avatar ? (
            <img src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:3000${user.avatar}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <i className="bi bi-person"></i>
          )}
        </Link>
        <Link to="/admin" className="btn-admin">
          <i className="bi bi-grid-3x3-gap"></i> Admin
        </Link>
      </div>
    </nav>
  );
};

export default Header;
