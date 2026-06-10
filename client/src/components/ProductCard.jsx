import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.Category?.name}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <Link to={`/products/${product.id}`} className="btn-view">Xem chi tiết</Link>
      </div>
    </div>
  );
};

export default ProductCard;
