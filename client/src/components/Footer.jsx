import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Shop<span>Flow</span></div>
            <p className="footer-desc">Nền tảng thương mại điện tử tích hợp biến thể sản phẩm và đơn vị vận chuyển hàng đầu Việt Nam.</p>
          </div>
          <div>
            <div className="footer-heading">Sản phẩm</div>
            <div className="footer-links">
              <Link to="/products?category=phone">Điện thoại</Link>
              <Link to="/products?category=laptop">Laptop</Link>
              <Link to="/products?category=headphone">Tai nghe</Link>
              <Link to="/products?category=watch">Smartwatch</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Hỗ trợ</div>
            <div className="footer-links">
              <Link to="/orders">Tra cứu đơn hàng</Link>
              <Link to="/policy">Chính sách đổi trả</Link>
              <Link to="/warranty">Bảo hành</Link>
              <Link to="/contact">Liên hệ</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Thanh toán</div>
            <div className="footer-links">
              <a href="#"><i className="bi bi-credit-card-2-front"></i> VNPay</a>
              <a href="#"><i className="bi bi-wallet2"></i> MoMo</a>
              <a href="#"><i className="bi bi-wallet"></i> ZaloPay</a>
              <a href="#"><i className="bi bi-cash"></i> COD</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ShopFlow. FPT Polytechnic – Nhóm 5.</span>
          <span>WD20302</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
