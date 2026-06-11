import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          STORE<span>FRONT</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Trang chủ</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Sản phẩm</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Giỏ hàng</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Cá nhân</NavLink>
        </nav>
        <div className="header-actions">
          <button className="btn-icon">🔍</button>
          <Link to="/cart" className="cart-icon">
            🛒 <span className="badge">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
