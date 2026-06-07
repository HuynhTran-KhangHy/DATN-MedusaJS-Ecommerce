import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80" alt="Hero" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge"><i className="bi bi-lightning-charge-fill"></i> Đỉnh Cao Âm Thanh 2025</div>
          <h1 className="hero-title">TRẢI NGHIỆM <em>VƯỢT</em><br/>GIỚI HẠN</h1>
          <p className="hero-desc">Khám phá bộ sưu tập thiết bị âm thanh và công nghệ đẳng cấp thế giới. Thiết kế sang trọng, hiệu năng vượt trội.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn btn-primary btn-lg">MUA NGAY</Link>
            <Link to="/products" className="btn btn-outline btn-lg">TÌM HIỂU THÊM</Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section-sm categories-section">
        <div className="container">
          <div className="categories-strip">
            <div className="cat-chip active"><i className="bi bi-grid"></i> Tất cả</div>
            <div className="cat-chip"><i className="bi bi-headphones"></i> Tai nghe</div>
            <div className="cat-chip"><i className="bi bi-phone"></i> Điện thoại</div>
            <div className="cat-chip"><i className="bi bi-laptop"></i> Laptop</div>
            <div className="cat-chip"><i className="bi bi-watch"></i> Smartwatch</div>
            <div className="cat-chip"><i className="bi bi-speaker"></i> Loa</div>
            <div className="cat-chip"><i className="bi bi-camera"></i> Máy ảnh</div>
            <div className="cat-chip"><i className="bi bi-controller"></i> Gaming</div>
            <div className="cat-chip"><i className="bi bi-usb-plug"></i> Phụ kiện</div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section products-section-bg">
        <div className="container">
          <div className="section-header">
            <div className="section-header-row">
              <div>
                <div className="section-title">SẢN PHẨM NỔI BẬT</div>
                <p className="section-subtitle">Những thiết bị được yêu thích nhất trong tháng</p>
              </div>
              <Link to="/products" className="see-all">XEM TẤT CẢ <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="products-grid">
            {/* Card 1 */}
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" alt="Headphones" />
                <span className="product-badge badge-new">Mới</span>
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Tai nghe chụp tai</div>
                <div className="product-name">Wireless Over-Ear Studio Pro</div>
                <div className="product-price-row">
                  <span className="product-price">8.990.000đ</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" alt="Watch" />
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Smartwatch</div>
                <div className="product-name">Luxury Smart Chrono</div>
                <div className="product-price-row">
                  <span className="product-price">12.500.000đ</span>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80" alt="Speaker" />
                <span className="product-badge badge-sale">-15%</span>
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Loa Bluetooth</div>
                <div className="product-name">Portable SoundBox Extreme</div>
                <div className="product-price-row">
                  <span className="product-price">4.250.000đ</span>
                  <span className="product-price-old">5.000.000đ</span>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80" alt="Phone" />
                <span className="product-badge badge-new">Mới</span>
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Điện thoại</div>
                <div className="product-name">iPhone 16 Pro 128GB</div>
                <div className="product-price-row">
                  <span className="product-price">26.990.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="section promo-section-bg">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-banner-text">
              <h2>FLASH SALE<br/>CUỐI TUẦN</h2>
              <p>Hàng nghìn sản phẩm giảm giá sốc. Số lượng có hạn!</p>
              <Link to="/products" className="btn btn-accent" style={{ marginTop: '1.5rem' }}>MUA NGAY <i className="bi bi-arrow-right"></i></Link>
            </div>
            <div className="promo-badge">GIẢM<br/>ĐẾN 50%</div>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section products-section-bg">
        <div className="container">
          <div className="section-header">
            <div className="section-header-row">
              <div>
                <div className="section-title">HÀNG MỚI VỀ</div>
                <p className="section-subtitle">Cập nhật sản phẩm mới nhất mỗi ngày</p>
              </div>
              <Link to="/products" className="see-all">XEM TẤT CẢ <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80" alt="Laptop" />
                <span className="product-badge badge-new">Mới</span>
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Laptop</div>
                <div className="product-name">MacBook Pro M3 14"</div>
                <div className="product-price-row">
                  <span className="product-price">42.990.000đ</span>
                </div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80" alt="Camera" />
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Máy ảnh</div>
                <div className="product-name">Sony A7 IV Mirrorless</div>
                <div className="product-price-row">
                  <span className="product-price">58.500.000đ</span>
                </div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80" alt="Earbuds" />
                <span className="product-badge badge-sale">-10%</span>
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Tai nghe</div>
                <div className="product-name">AirPods Pro 2nd Gen</div>
                <div className="product-price-row">
                  <span className="product-price">5.850.000đ</span>
                  <span className="product-price-old">6.500.000đ</span>
                </div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card-img">
                <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" alt="Gaming" />
                <button className="product-card-btn-add btn-add-cart"><i className="bi bi-plus"></i></button>
              </div>
              <div className="product-card-body">
                <div className="product-category">Gaming</div>
                <div className="product-name">PS5 DualSense Edge</div>
                <div className="product-price-row">
                  <span className="product-price">3.290.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section-sm features-section">
        <div className="container">
          <div className="features-grid" style={{ textAlign: 'center' }}>
            <div>
              <div className="feature-icon"><i className="bi bi-truck"></i></div>
              <div className="fw-700 text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Giao hàng nhanh</div>
              <div className="text-xs text-muted">Tích hợp GHN & GHTK</div>
            </div>
            <div>
              <div className="feature-icon"><i className="bi bi-shield-check"></i></div>
              <div className="fw-700 text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Bảo hành chính hãng</div>
              <div className="text-xs text-muted">12–24 tháng tại hãng</div>
            </div>
            <div>
              <div className="feature-icon"><i className="bi bi-arrow-return-left"></i></div>
              <div className="fw-700 text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Đổi trả 30 ngày</div>
              <div className="text-xs text-muted">Miễn phí đổi trả</div>
            </div>
            <div>
              <div className="feature-icon"><i className="bi bi-credit-card"></i></div>
              <div className="fw-700 text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Thanh toán đa dạng</div>
              <div className="text-xs text-muted">VNPay, MoMo, ZaloPay, COD</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
