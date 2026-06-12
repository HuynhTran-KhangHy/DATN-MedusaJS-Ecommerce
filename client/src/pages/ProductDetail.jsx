import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States cho biến thể đã chọn
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentVariant, setCurrentVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        const payload = res.data?.data || res.data?.product || res.data;

        setProduct(payload);

        // Mặc định chọn biến thể đầu tiên nếu có
        if (payload?.variants?.length > 0) {
          const first = payload.variants[0];
          setSelectedColor(first.color);
          setSelectedSize(first.size);
          setCurrentVariant(first);
        }
      } catch (err) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Tìm biến thể khớp với Color và Size đang chọn
  useEffect(() => {
    if (product?.variants) {
      const match = product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
      setCurrentVariant(match || null);
    }
  }, [selectedColor, selectedSize, product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) return <div className="container">Đang tải sản phẩm...</div>;
  if (!product) return <div className="container">Không tìm thấy sản phẩm.</div>;

  // Lấy danh sách Color và Size duy nhất từ các biến thể
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const colors = [...new Set(variants.map(v => v.color))].filter(Boolean);
  const sizes = [...new Set(variants.map(v => v.size))].filter(Boolean);

  // Hiển thị giá và ảnh: Ưu tiên theo biến thể, nếu k có thì lấy của sản phẩm gốc
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayImage = currentVariant?.image ? currentVariant.image : product.image;
  const isOutOfStock = currentVariant ? currentVariant.stock === 0 : false;

  return (
    <div className="product-detail-container page-transition">
      {/* Cột trái: Hình ảnh */}
      <div className="product-gallery">
        <div className="main-image">
          <img src={displayImage} alt={product.name} />
        </div>
      </div>

      {/* Cột phải: Thông tin */}
      <div className="product-info-details">
        <span className="category-tag">{product.category?.name || product.Category?.name || 'Sản phẩm'}</span>
        <h1>{product.name}</h1>
        
        <div className="rating">
          <span>⭐⭐⭐⭐⭐</span>
          <span>(120 đánh giá)</span>
        </div>

        <div className="current-price">{formatPrice(displayPrice)}</div>

        <div className="description-box">
          <p>{product.description}</p>
        </div>

        {/* Lựa chọn biến thể */}
        <div className="variant-selection">
          {colors.length > 0 && (
            <div className="variant-group">
              <label>Màu sắc: {selectedColor}</label>
              <div className="option-list">
                {colors.map(color => (
                  <button 
                    key={color}
                    className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="variant-group">
              <label>Kích thước: {selectedSize}</label>
              <div className="option-list">
                {sizes.map(size => (
                  <button 
                    key={size}
                    className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trạng thái kho */}
        {currentVariant && (
          <div className={`stock-status ${isOutOfStock ? 'stock-out' : 'stock-in'}`}>
            {isOutOfStock ? '❌ Hết hàng' : `✅ Còn hàng (${currentVariant.stock} sản phẩm)`}
          </div>
        )}

        {/* Hành động mua hàng */}
        <div className="purchase-actions">
          <button className="btn-add-cart" disabled={isOutOfStock || !currentVariant}>
            {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
          </button>
          <button className="btn-wishlist">❤️</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
