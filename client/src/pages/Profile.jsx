import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setFormData({
        fullName: res.data.fullName || '',
        email: res.data.email || '',
        password: ''
      });
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:3000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage({ type: 'success', text: 'Cập nhật hồ sơ thành công!' });
      setEditing(false);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Lỗi khi cập nhật.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('avatar', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/upload-avatar', uploadData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser({ ...user, avatar: res.data.avatar });
      setMessage({ type: 'success', text: 'Tải ảnh đại diện mới thành công!' });
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Lỗi tải ảnh.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return <div className="container section">Đang tải...</div>;

  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">TÀI KHOẢN CỦA TÔI</h1>
        <p className="section-subtitle">Quản lý thông tin cá nhân và ảnh đại diện</p>
      </div>

      <div className="cart-layout" style={{ gridTemplateColumns: '280px 1fr' }}>
        {/* Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <div className="filter-check active" style={{ fontWeight: 700, color: 'var(--accent)' }}>
              <i className="bi bi-person-circle"></i> Thông tin cá nhân
            </div>
            <div className="filter-check" style={{ marginTop: '2rem', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}>
              <i className="bi bi-box-arrow-right"></i> Đăng xuất
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="account-content">
          {message.text && (
            <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#166534' : '#991b1b', fontSize: '0.85rem' }}>
               <i className={message.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'}></i> {message.text}
            </div>
          )}

          <div className="promo-banner" style={{ padding: '2rem', marginBottom: '2rem', background: '#f8f8f6', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div 
                style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: 'var(--dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => fileInputRef.current.click()}
              >
                {user.avatar ? (
                  <img src={`http://localhost:3000${user.avatar}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                   user.fullName?.charAt(0).toUpperCase() || '👤'
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', fontSize: '0.7rem', padding: '2px', textAlign: 'center' }}>SỬA</div>
              </div>
              <input type="file" ref={fileInputRef} hidden onChange={handleAvatarUpload} accept="image/*" />
              
              <div style={{ color: 'var(--dark)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem', fontFamily: 'var(--font-display)' }}>{user.fullName || 'CHƯA CẬP NHẬT'}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="filter-sidebar" style={{ position: 'static', maxWidth: '600px' }}>
            <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="filter-section-title" style={{ marginBottom: 0 }}>Thông tin cá nhân</div>
              <button 
                className="btn btn-outline btn-sm" 
                style={{ borderColor: 'var(--dark)', color: 'var(--dark)' }}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'HỦY BỎ' : 'CHỈNH SỬA'}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Họ và tên</label>
                  <input 
                    type="text" 
                    className="price-input" 
                    style={{ width: '100%', borderRadius: '4px' }}
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Email</label>
                  <input 
                    type="email" 
                    className="price-input" 
                    style={{ width: '100%', borderRadius: '4px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Mật khẩu mới (Bỏ trống nếu không đổi)</label>
                  <input 
                    type="password" 
                    className="price-input" 
                    style={{ width: '100%', borderRadius: '4px' }}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                  {loading ? 'Đang lưu...' : 'LƯU THÔNG TIN'}
                </button>
              </form>
            ) : (
              <div className="products-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gray)', display: 'block' }}>Họ tên</label>
                  <div style={{ fontWeight: 600 }}>{user.fullName || '---'}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gray)', display: 'block' }}>Email</label>
                  <div style={{ fontWeight: 600 }}>{user.email}</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
