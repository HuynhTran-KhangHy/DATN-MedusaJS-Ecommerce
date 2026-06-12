import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add uses the base_price
    addToCart(product, null, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Sử dụng base_price nếu không có price (để tương thích với DB)
  const displayPrice = product.price || product.base_price || 0;
  // Sử dụng is_featured hoặc is_new
  const isBadgeVisible = product.is_featured || product.is_new;

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-img">
        <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} />
        {isBadgeVisible && <span className="product-badge badge-new">HOT</span>}
        <button 
          className="product-card-btn-add btn-add-cart" 
          onClick={handleQuickAdd}
          style={{ background: added ? 'var(--success)' : 'var(--dark)' }}
        >
          {added ? <i className="bi bi-check"></i> : <i className="bi bi-plus"></i>}
        </button>
      </Link>
      <div className="product-card-body">
        <div className="product-category">{product.Category?.name || product.category?.name || 'Sản phẩm'}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-price-row">
          <span className="product-price">{formatPrice(displayPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
