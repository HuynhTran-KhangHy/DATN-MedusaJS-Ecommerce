const Cart = () => {
  return (
    <div>
      <h1 style={{marginBottom: '30px'}}>Giỏ hàng của bạn</h1>
      <div style={{display: 'flex', gap: '30px'}}>
        <div style={{flex: 1, background: 'white', borderRadius: '15px', padding: '20px', boxShadow: 'var(--shadow)'}}>
          <p style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
            Giỏ hàng đang trống. <a href="/products" style={{color: 'var(--primary)'}}>Tiếp tục mua sắm</a>
          </p>
        </div>
        <aside style={{width: '350px', background: 'white', borderRadius: '15px', padding: '25px', boxShadow: 'var(--shadow)', height: 'fit-content'}}>
          <h2 style={{marginBottom: '20px'}}>Tổng cộng</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <span>Tạm tính</span>
            <span>0đ</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: '700', fontSize: '1.2rem', paddingTop: '15px', borderTop: '1px solid var(--border)'}}>
            <span>Tổng tiền</span>
            <span>0đ</span>
          </div>
          <button style={{width: '100%', padding: '15px', background: 'var(--primary)', color: 'white', borderRadius: '10px', fontWeight: '600'}}>
            Thanh toán
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
