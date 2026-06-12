import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.products)) return payload.products;
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('http://localhost:3000/api/categories'),
          axios.get('http://localhost:3000/api/products/featured')
        ]);

        setCategories(normalizeList(catRes.data));
        setFeaturedProducts(normalizeList(prodRes.data));
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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge-new">Xu hướng 2026</span>
          <h1>Công Nghệ Cho <br /><span>Cuộc Sống</span></h1>
          <p>Khám phá bộ sưu tập những thiết bị đỉnh cao với ưu đãi lớn nhất trong năm.</p>
          <div className="hero-btns">
            <button className="btn-main">Mua sắm ngay</button>
            <button className="btn-outline">Tìm hiểu thêm</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="gradient-circle"></div>
          {/* Placeholder for Hero Image */}
          <img src="https://img.tgdd.vn/img-border/iphone-15-pro-max-blue-1-600x600.jpg" alt="Hero" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-title">
          <h2>Danh mục nổi bật</h2>
          <p>Mọi thứ bạn cần đều ở đây</p>
        </div>
        <div className="categories-grid">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="skeleton-card"></div>)
          ) : (
            categories.map(cat => (
              <div key={cat.id} className="category-card">
                <div className="cat-icon">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <h3>{cat.name}</h3>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-title">
          <h2>Sản phẩm nổi bật</h2>
          <button className="view-all">Xem tất cả →</button>
        </div>
        <div className="products-grid">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="skeleton-product"></div>)
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
