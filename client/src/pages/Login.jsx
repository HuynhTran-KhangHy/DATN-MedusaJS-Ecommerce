import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/client/auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-layout">
      <div className="auth-visual">
        <div className="auth-visual-img">
          <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80" alt="Login Visual" />
          <div className="auth-visual-overlay"></div>
        </div>
        <div className="auth-visual-content">
          <Link to="/" className="auth-visual-brand">Shop<span>Flow</span></Link>
        </div>
        <div className="auth-visual-content">
          <div className="auth-visual-quote">TRẢI NGHIỆM<br />MUA SẮM <em>ĐỈNH CAO</em></div>
          <p className="auth-visual-sub">Hàng ngàn sản phẩm chính hãng, giao hàng nhanh toàn quốc.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '1px', marginBottom: '0.2rem' }}>Đăng nhập</h1>
            <p className="text-muted text-sm">Chào mừng bạn trở lại! Vui lòng đăng nhập.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <div className="input-icon-wrap">
              <i className="bi bi-envelope"></i>
              <input type="email" className="form-control" placeholder="email@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label flex-between">
              Mật khẩu *
              <a href="#" className="form-link text-sm" style={{ fontWeight: 500 }}>Quên mật khẩu?</a>
            </label>
            <div className="input-icon-wrap">
              <i className="bi bi-lock"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                placeholder="Nhập mật khẩu..." 
              />
              <button className="toggle-pw" onClick={togglePassword}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '1.5rem' }}>
            <i className="bi bi-box-arrow-in-right"></i> ĐĂNG NHẬP
          </button>

          <div className="divider" style={{ margin: '1.5rem 0' }}>hoặc tiếp tục với</div>

          <button className="social-btn" onClick={handleGoogleLogin}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Đăng nhập với Google
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
