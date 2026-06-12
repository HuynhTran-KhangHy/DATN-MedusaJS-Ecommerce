import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Register, 2: OTP
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      setMessage({ type: 'success', text: 'Đăng ký thành công! Vui lòng kiểm tra mã OTP tại Terminal của Server.' });
      setStep(2);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/verify-otp', {
        email: formData.email,
        otp
      });
      setMessage({ type: 'success', text: 'Xác thực thành công! Đang chuyển hướng đến trang đăng nhập...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Mã OTP không chính xác.' });
    } finally {
      setLoading(false);
    }
  };

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
            <h1 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: '2rem', letterSpacing: '1px', marginBottom: '0.2rem' }}>
              {step === 1 ? 'Đăng ký' : 'Xác thực OTP'}
            </h1>
            <p className="text-muted text-sm" style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
              {step === 1 ? 'Tạo tài khoản mới chỉ trong vài giây.' : `Chúng tôi đã gửi mã xác thực đến ${formData.email}`}
            </p>
          </div>

          {message.text && (
            <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#166534' : '#991b1b', fontSize: '0.85rem' }}>
              <i className={message.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'}></i> {message.text}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRegister}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Họ và tên *</label>
                <div className="input-icon-wrap">
                  <i className="bi bi-person"></i>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} 
                    placeholder="Nguyễn Văn A" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Email *</label>
                <div className="input-icon-wrap">
                  <i className="bi bi-envelope"></i>
                  <input 
                    type="email" 
                    className="form-control" 
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} 
                    placeholder="email@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Mật khẩu *</label>
                <div className="input-icon-wrap">
                  <i className="bi bi-lock"></i>
                  <input 
                    type="password" 
                    className="form-control" 
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)' }} 
                    placeholder="Tạo mật khẩu mạnh..." 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
                <i className="bi bi-person-plus"></i> {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ NGAY'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Mã OTP (6 chữ số) *</label>
                <div className="input-icon-wrap">
                  <i className="bi bi-shield-lock"></i>
                  <input 
                    type="text" 
                    maxLength="6"
                    className="form-control" 
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', letterSpacing: '8px', fontSize: '1.2rem', fontWeight: '800' }} 
                    placeholder="000000" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
                {loading ? 'Đang xác thực...' : 'XÁC THỰC TÀI KHOẢN'}
              </button>
            </form>
          )}

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
