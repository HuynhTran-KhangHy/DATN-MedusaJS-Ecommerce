import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="auth-layout">
      {/* VISUAL SIDE */}
      <div className="auth-visual">
        <div className="auth-visual-img">
          <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80" alt="" />
          <div className="auth-visual-overlay"></div>
        </div>
        <div className="auth-visual-content">
          <Link to="/" className="auth-visual-brand">Shop<span>Flow</span></Link>
        </div>
        <div className="auth-visual-content">
          <div className="auth-visual-quote">THAM GIA<br />CỘNG ĐỒNG <em>MUA SẮM</em></div>
          <p className="auth-visual-sub">Khởi tạo tài khoản ngay để nhận ưu đãi lên đến 50% cho đơn hàng đầu tiên.</p>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: '2rem', letterSpacing: '1px', marginBottom: '0.2rem' }}>Đăng ký</h1>
            <p className="text-muted text-sm" style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>Tạo tài khoản mới chỉ trong vài giây.</p>
          </div>

          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Họ và tên *</label>
            <div className="input-icon-wrap">
              <i className="bi bi-person"></i>
              <input type="text" className="form-control" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} placeholder="Nguyễn Văn A" />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Email *</label>
            <div className="input-icon-wrap">
              <i className="bi bi-envelope"></i>
              <input type="email" className="form-control" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} placeholder="email@example.com" />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Mật khẩu *</label>
            <div className="input-icon-wrap">
              <i className="bi bi-lock"></i>
              <input type="password" className="form-control" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} placeholder="Tạo mật khẩu mạnh..." />
              <button className="toggle-pw"><i className="bi bi-eye"></i></button>
            </div>
            <div className="strength-bar"><div className="strength-fill"></div></div>
          </div>

          <button className="btn btn-primary btn-block btn-lg">
            <i className="bi bi-person-plus"></i> ĐĂNG KÝ NGAY
          </button>

          <div className="divider" style={{ textAlign: 'center', margin: '1.5rem 0', color: 'var(--gray)', fontSize: '0.8rem' }}>hoặc đăng ký với</div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
           <button className="social-btn" style={{ flex: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            </button>
            <button className="social-btn" style={{ flex: 1 }}>
              <i className="bi bi-facebook" style={{ color: '#1877F2', fontSize: '1.1rem' }}></i>
            </button>
          </div>

          <p className="text-sm text-muted" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            Đã có tài khoản? <Link to="/login" className="form-link" style={{ color: 'var(--accent)', fontWeight: 600 }}>Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
