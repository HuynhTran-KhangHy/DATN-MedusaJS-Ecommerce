import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, null, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayPrice = product.price || product.base_price || 0;
  const isBadgeVisible = product.is_featured || product.is_new;

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to={`/products/${product.id}`} className="product-card-img" style={{ flexShrink: 0 }}>
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'} 
          alt={product.name} 
        />
        {isBadgeVisible && <span className="product-badge badge-new">HOT</span>}
        <button 
          className="product-card-btn-add btn-add-cart" 
          onClick={handleQuickAdd}
          style={{ 
            background: added ? 'var(--success)' : 'var(--dark)',
            opacity: 1 // Ensure it's visible on hover or mobile
          }}
        >
          {added ? <i className="bi bi-check"></i> : <i className="bi bi-plus"></i>}
        </button>
      </Link>
      <div className="product-card-body" style={{ flexGrow: 1, background: '#fff' }}>
        <div className="product-category">{product.category?.name || 'Sản phẩm'}</div>
        <Link to={`/products/${product.id}`} className="product-name" style={{ display: 'block', color: 'var(--dark)' }}>
          {product.name || 'Sản phẩm chưa có tên'}
        </Link>
        <div className="product-price-row">
          <span className="product-price" style={{ color: 'var(--accent)' }}>{formatPrice(displayPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
