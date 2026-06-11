import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-img">
        <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} />
        {product.is_featured && <span className="product-badge badge-new">Mới</span>}
        <button className="product-card-btn-add btn-add-cart" onClick={(e) => {
          e.preventDefault();
          // Add to cart logic will go here
        }}>
          <i className="bi bi-plus"></i>
        </button>
      </Link>
      <div className="product-card-body">
        <div className="product-category">{product.Category?.name}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
