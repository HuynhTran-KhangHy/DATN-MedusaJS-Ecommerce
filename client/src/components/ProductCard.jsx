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
    // Quick add uses the base product price and no specific variant if not chosen
    addToCart(product, null, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-img">
        <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} />
        {product.is_new && <span className="product-badge badge-new">Mới</span>}
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
          <span className="product-price">{formatPrice(product.price || product.base_price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
