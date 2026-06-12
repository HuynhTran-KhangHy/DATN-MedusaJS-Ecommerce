import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { totalItems } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));

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
          <Link to="/profile">Tài khoản</Link>
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
            <img src={`http://localhost:3000${user.avatar}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
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
