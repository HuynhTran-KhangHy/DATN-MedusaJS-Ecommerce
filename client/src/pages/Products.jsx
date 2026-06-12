import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States cho Lọc và Phân trang
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

  // Lấy danh mục để hiển thị ở Sidebar
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

  // Lấy dữ liệu sản phẩm khi Filter hoặc Page thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: pagination.page,
          limit: 8,
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

    const timer = setTimeout(fetchProducts, 300); // Debounce để tránh gọi API quá nhiều
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
    <div className="products-page">
      {/* Sidebar Lọc */}
      <aside className="filters-sidebar">
        <div className="filter-group">
          <h3>Danh mục</h3>
          <div className="category-list">
            {categories.map(cat => (
              <label key={cat.id} className={`category-item ${filters.categoryId === cat.id ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={filters.categoryId === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Khoảng giá</h3>
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Từ" 
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Đến" 
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
        </div>

        <button className="btn-filter" onClick={() => setPagination(prev => ({...prev, page: 1}))}>
          Áp dụng
        </button>
      </aside>

      {/* Danh sách sản phẩm */}
      <main className="products-content">
        <div className="content-header">
          <h1>Tất cả sản phẩm</h1>
          <span className="results-count">Hiển thị {products.length} trong {pagination.totalItems} sản phẩm</span>
        </div>

        <div className="products-grid">
          {loading ? (
            Array(8).fill(0).map((_, i) => <div key={i} className="skeleton-card"></div>)
          ) : products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px'}}>
              <h3>Không tìm thấy sản phẩm nào khớp với bộ lọc.</h3>
            </div>
          )}
        </div>

        {/* Phân trang */}
        {pagination.totalPages > 1 && (
          <div className="pagination">
            <button 
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
              <button 
                key={p}
                className={pagination.page === p ? 'active' : ''}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </button>
            ))}
            <button 
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
