import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <i className="bi bi-bag-x" style={{ fontSize: '4rem', color: '#ccc', display: 'block', marginBottom: '1.5rem' }}></i>
        <h1 className="section-title">GIỎ HÀNG TRỐNG</h1>
        <p className="section-subtitle">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '2rem' }}>TIẾP TỤC MUA SẮM</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">GIỎ HÀNG CỦA BẠN ({cartItems.length})</h1>
        <p className="section-subtitle">Kiểm tra lại sản phẩm trước khi thanh toán</p>
      </div>

      <div className="cart-layout">
        {/* Danh sách sản phẩm */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.variantId}`} className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-variant">{item.variantLabel || 'Bản tiêu chuẩn'}</div>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
              </div>
              <div className="qty-control" style={{ transform: 'scale(0.8)' }}>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}>-</button>
                <input type="text" className="qty-value" value={item.quantity} readOnly />
                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}>+</button>
              </div>
              <div style={{ minWidth: '100px', textAlign: 'right', fontWeight: 700 }}>
                {formatPrice(item.price * item.quantity)}
              </div>
              <button 
                className="cart-item-remove" 
                onClick={() => removeFromCart(item.id, item.variantId)}
                title="Xóa khỏi giỏ hàng"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Tổng kết đơn hàng */}
        <aside className="cart-summary">
          <h3 style={{ borderBottom: '2px solid var(--dark)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>TỔNG CỘNG</h3>
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Miễn phí</span>
          </div>
          <div className="summary-row total" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #eee' }}>
            <span>Tổng số tiền</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 700 }}>{formatPrice(subtotal)}</span>
          </div>

          <div className="coupon-input" style={{ marginTop: '1.5rem' }}>
            <input type="text" className="price-input" placeholder="Mã giảm giá..." style={{ width: '100%', marginBottom: '0.5rem' }} />
            <button className="btn btn-outline btn-block" style={{ fontSize: '0.8rem', padding: '0.5rem', borderColor: 'var(--dark)', color: 'var(--dark)' }}>ÁP DỤNG</button>
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: '1.5rem', height: '60px', borderRadius: '8px' }}>
            TIẾN HÀNH THANH TOÁN
          </button>
          
          <Link to="/products" className="btn btn-link btn-block" style={{ marginTop: '1rem', color: 'var(--gray)', fontSize: '0.85rem', textAlign: 'center', display: 'block' }}>
            <i className="bi bi-arrow-left"></i> TIẾP TỤC MUA SẮM
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
