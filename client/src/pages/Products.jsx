import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    categoryId: '',
    minPrice: '',
    maxPrice: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: pagination.page,
          limit: 9,
          ...filters
        };
        const res = await axios.get('http://localhost:3000/api/products', { params });
        const payload = res.data?.data || res.data;
        const items = Array.isArray(payload?.products) ? payload.products : Array.isArray(res.data?.products) ? res.data.products : [];

        setProducts(items);
        setPagination(prev => ({
          ...prev,
          totalPages: payload?.totalPages ?? res.data?.totalPages ?? 1,
          totalItems: payload?.totalItems ?? res.data?.totalItems ?? 0
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [filters, pagination.page]);

  const handleCategoryChange = (catId) => {
    setFilters(prev => ({
      ...prev,
      categoryId: prev.categoryId === catId ? '' : catId
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container section">
      <div className="products-layout">
        {/* Sidebar Lọc */}
        <aside className="filter-sidebar">
          <div className="filter-title">
            <i className="bi bi-filter-left"></i> BỘ LỌC TÌM KIẾM
          </div>
          
          <div className="filter-section">
            <div className="filter-section-title">Danh mục</div>
            {categories.map(cat => (
              <label key={cat.id} className="filter-check">
                <input 
                  type="checkbox" 
                  checked={filters.categoryId === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Khoảng giá</div>
            
            <div className="price-chips">
              {[
                { label: 'Dưới 5tr', min: 0, max: 5000000 },
                { label: '5tr - 10tr', min: 5000000, max: 10000000 },
                { label: '10tr - 20tr', min: 10000000, max: 20000000 },
                { label: 'Trên 20tr', min: 20000000, max: 999000000 },
              ].map((range, idx) => (
                <button 
                  key={idx}
                  className={`price-chip ${filters.minPrice === range.min && filters.maxPrice === range.max ? 'active' : ''}`}
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      minPrice: range.min,
                      maxPrice: range.max
                    }));
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="price-range">
              <div className="price-input-group">
                <input 
                  type="number" 
                  className="price-input" 
                  placeholder="Từ" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
              </div>
              <span style={{ color: 'var(--gray)' }}>-</span>
              <div className="price-input-group">
                <input 
                  type="number" 
                  className="price-input" 
                  placeholder="Đến" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-block" 
            style={{ 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }} 
            onClick={() => setPagination(prev => ({...prev, page: 1}))}
          >
            <i className="bi bi-check2-circle"></i>
            ÁP DỤNG
          </button>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="products-content">
          <div className="products-header">
            <div className="section-title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>SẢN PHẨM</div>
            <div className="products-count">Hiển thị {products.length} trên {pagination.totalItems} kết quả</div>
          </div>

          <div className="products-grid">
            {loading ? (
              Array(6).fill(0).map((_, i) => <div key={i} className="skeleton-card" style={{ height: '350px', background: '#f1f5f9', borderRadius: '10px' }}></div>)
            ) : products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                <i className="bi bi-search" style={{ fontSize: '3rem', color: '#ccc', display: 'block', marginBottom: '1rem' }}></i>
                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
              </div>
            )}
          </div>

          {/* Phân trang */}
          {pagination.totalPages > 1 && (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
              <button 
                className="btn-icon"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                style={{ border: '1px solid #eee' }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p}
                  className={`btn-icon ${pagination.page === p ? 'active' : ''}`}
                  onClick={() => handlePageChange(p)}
                  style={{ 
                    border: '1px solid #eee',
                    background: pagination.page === p ? 'var(--dark)' : 'white',
                    color: pagination.page === p ? 'white' : 'var(--dark)'
                  }}
                >
                  {p}
                </button>
              ))}
              <button 
                className="btn-icon"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                style={{ border: '1px solid #eee' }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
