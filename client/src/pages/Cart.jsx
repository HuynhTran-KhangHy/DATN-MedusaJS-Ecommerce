import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">GIỎ HÀNG CỦA BẠN</h1>
        <p className="section-subtitle">Kiểm tra lại sản phẩm trước khi thanh toán</p>
      </div>

      <div className="cart-layout">
        {/* Danh sách sản phẩm */}
        <div className="cart-items">
          <div className="cart-item">
            <div className="cart-item-img">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" alt="product" />
            </div>
            <div className="cart-item-info">
              <div className="cart-item-name">Wireless Over-Ear Studio Pro</div>
              <div className="cart-item-variant">Màu: Titan Đen / Size: 256GB</div>
              <div className="cart-item-price">8.990.000đ</div>
            </div>
            <div className="qty-control" style={{ transform: 'scale(0.8)' }}>
              <button className="qty-btn">-</button>
              <input type="text" className="qty-value" value="1" readOnly />
              <button className="qty-btn">+</button>
            </div>
            <button className="cart-item-remove"><i className="bi bi-trash"></i></button>
          </div>

          <div className="cart-item">
            <div className="cart-item-img">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" alt="product" />
            </div>
            <div className="cart-item-info">
              <div className="cart-item-name">Luxury Smart Chrono</div>
              <div className="cart-item-variant">Màu: Gold / Size: 44mm</div>
              <div className="cart-item-price">12.500.000đ</div>
            </div>
            <div className="qty-control" style={{ transform: 'scale(0.8)' }}>
              <button className="qty-btn">-</button>
              <input type="text" className="qty-value" value="2" readOnly />
              <button className="qty-btn">+</button>
            </div>
            <button className="cart-item-remove"><i className="bi bi-trash"></i></button>
          </div>
        </div>

        {/* Tổng kết đơn hàng */}
        <aside className="cart-summary">
          <h3 style={{ borderBottom: '2px solid var(--dark)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>TỔNG CỘNG</h3>
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>21.490.000đ</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Miễn phí</span>
          </div>
          <div className="summary-row total">
            <span>Tổng số tiền</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>21.490.000đ</span>
          </div>

          <div className="coupon-input">
            <input type="text" className="price-input" placeholder="Mã giảm giá..." />
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>ÁP DỤNG</button>
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: '1rem', height: '50px' }}>
            TIẾN HÀNH THANH TOÁN
          </button>
          
          <Link to="/products" className="btn btn-outline btn-block" style={{ marginTop: '1rem', color: 'var(--dark)', borderColor: 'var(--dark)' }}>
            TIẾP TỤC MUA SẮM
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
