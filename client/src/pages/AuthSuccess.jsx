import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <h2 style={{ color: '#4CAF50' }}>Đăng nhập thành công!</h2>
      <p>Đang chuyển hướng về trang chủ...</p>
    </div>
  );
};

export default AuthSuccess;
