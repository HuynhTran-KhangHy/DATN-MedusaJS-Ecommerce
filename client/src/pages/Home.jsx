import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('http://localhost:3000/api/categories'),
          axios.get('http://localhost:3000/api/products/featured')
        ]);
        setCategories(catRes.data);
        setFeaturedProducts(prodRes.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80" alt="Hero" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge"><i className="bi bi-lightning-charge-fill"></i> Đỉnh Cao Âm Thanh 2026</div>
          <h1 className="hero-title">TRẢI NGHIỆM <em>VƯỢT</em><br />GIỚI HẠN</h1>
          <p className="hero-desc">Khám phá bộ sưu tập thiết bị âm thanh và công nghệ đẳng cấp thế giới. Thiết kế sang trọng, hiệu năng vượt trội.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn btn-primary btn-lg">MUA NGAY</Link>
            <Link to="/products" className="btn btn-outline btn-lg">TÌM HIỂU THÊM</Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES STRIP ===== */}
      <section className="section-sm categories-section">
        <div className="container">
          <div className="categories-strip">
            <div className="cat-chip active"><i className="bi bi-grid"></i> Tất cả</div>
            {categories.map(cat => (
              <div key={cat.id} className="cat-chip">
                <i className="bi bi-tag"></i> {cat.name}
              </div>
            ))}
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
            {loading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="skeleton-card"></div>)
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="section promo-section-bg">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-banner-text">
              <h2>FLASH SALE<br />CUỐI TUẦN</h2>
              <p>Hàng nghìn sản phẩm giảm giá sốc. Số lượng có hạn!</p>
              <Link to="/products" className="btn btn-accent" style={{ marginTop: '1.5rem' }}>MUA NGAY <i className="bi bi-arrow-right"></i></Link>
            </div>
            <div className="promo-badge">GIẢM<br />ĐẾN 50%</div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section-sm features-section">
        <div className="container">
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div className="feature-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}><i className="bi bi-truck"></i></div>
              <div className="fw-700 text-sm" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Giao hàng nhanh</div>
              <div className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Tích hợp GHN & GHTK</div>
            </div>
            <div>
              <div className="feature-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}><i className="bi bi-shield-check"></i></div>
              <div className="fw-700 text-sm" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Bảo hành chính hãng</div>
              <div className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>12–24 tháng tại hãng</div>
            </div>
            <div>
              <div className="feature-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}><i className="bi bi-arrow-return-left"></i></div>
              <div className="fw-700 text-sm" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Đổi trả 30 ngày</div>
              <div className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Miễn phí đổi trả</div>
            </div>
            <div>
              <div className="feature-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}><i className="bi bi-credit-card"></i></div>
              <div className="fw-700 text-sm" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Thanh toán đa dạng</div>
              <div className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>VNPay, MoMo, ZaloPay, COD</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
