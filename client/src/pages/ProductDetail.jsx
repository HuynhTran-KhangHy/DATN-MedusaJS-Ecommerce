import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentVariant, setCurrentVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
        
        if (res.data.variants && res.data.variants.length > 0) {
          const first = res.data.variants[0];
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

  useEffect(() => {
    if (product?.variants) {
      const match = product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
      setCurrentVariant(match || null);
    }
  }, [selectedColor, selectedSize, product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'đ');
  };

  if (loading) return <div className="container section">Đang tải sản phẩm...</div>;
  if (!product) return <div className="container section">Không tìm thấy sản phẩm.</div>;

  const colors = [...new Set(product.variants.map(v => v.color))].filter(Boolean);
  const sizes = [...new Set(product.variants.map(v => v.size))].filter(Boolean);

  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayImage = currentVariant?.image ? currentVariant.image : product.image;
  const isOutOfStock = currentVariant ? currentVariant.stock === 0 : false;

  return (
    <div className="container section">
      <div className="product-detail-grid">
        {/* Cột trái: Hình ảnh */}
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img src={displayImage} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            <div className="thumb active"><img src={displayImage} alt="thumb" /></div>
            {product.variants.filter(v => v.image && v.image !== displayImage).map((v, i) => (
              <div key={i} className="thumb"><img src={v.image} alt="thumb" /></div>
            ))}
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="product-info">
          <div className="product-detail-cat">{product.Category?.name}</div>
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-price">
            {formatPrice(displayPrice)}
            {/* <span>{formatPrice(displayPrice * 1.2)}</span> */}
          </div>

          <p className="hero-desc" style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
            {product.description}
          </p>

          <div className="variant-section">
            {colors.length > 0 && (
              <>
                <div className="variant-label">MÀU SẮC: {selectedColor}</div>
                <div className="variant-options" style={{ marginBottom: '1.5rem' }}>
                  {colors.map(color => (
                    <button 
                      key={color}
                      className={`variant-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </>
            )}

            {sizes.length > 0 && (
              <>
                <div className="variant-label">DUNG LƯỢNG / KÍCH THƯỚC: {selectedSize}</div>
                <div className="variant-options">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      className={`variant-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="variant-section">
            <div className="variant-label">Số lượng</div>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <input type="text" className="qty-value" value={quantity} readOnly />
              <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn btn-primary" disabled={isOutOfStock || !currentVariant}>
              {isOutOfStock ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
            </button>
            <button className="btn-icon" style={{ border: '1.5px solid #eee', width: '50px', height: '50px' }}>
              <i className="bi bi-heart"></i>
            </button>
          </div>

          <div className="product-meta">
            <div className="product-meta-row">
              <strong>Tình trạng:</strong>
              <span style={{ color: isOutOfStock ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                {isOutOfStock ? 'Hết hàng' : `Còn hàng (${currentVariant?.stock || 0})`}
              </span>
            </div>
            <div className="product-meta-row">
              <strong>Mã sản phẩm:</strong> <span>SF-{product.id}-{currentVariant?.id || 'BASE'}</span>
            </div>
            <div className="product-meta-row">
              <strong>Giao hàng:</strong> <span>Miễn phí vận chuyển toàn quốc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
