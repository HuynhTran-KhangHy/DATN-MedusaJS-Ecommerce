const Profile = () => {
  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '30px'}}>Thông tin cá nhân</h1>
      <div style={{display: 'flex', gap: '40px', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow)'}}>
        <div style={{width: '150px', height: '150px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'}}>
          👤
        </div>
        <div style={{flex: 1}}>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>Email</label>
            <p style={{fontWeight: '600'}}>nguoidung@example.com</p>
          </div>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>Họ tên</label>
            <p style={{fontWeight: '600'}}>Nguyễn Văn A</p>
          </div>
          <button style={{padding: '10px 20px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.9rem'}}>
            Thiết lập tài khoản
          </button>
        </div>
      </div>

      <div style={{marginTop: '40px'}}>
        <h2>Lịch sử đơn hàng</h2>
        <div style={{marginTop: '20px', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow)', textAlign: 'center', color: 'var(--text-muted)'}}>
          Bạn chưa có đơn hàng nào.
        </div>
      </div>
    </div>
  );
};

export default Profile;
