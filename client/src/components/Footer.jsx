import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="logo">STORE<span>FRONT</span></h2>
          <p>Nền tảng mua sắm trực tuyến hiện đại, nhanh chóng và tin cậy.</p>
        </div>
        <div className="footer-links">
          <h3>Sản phẩm</h3>
          <ul>
            <li><a href="#">Điện thoại</a></li>
            <li><a href="#">Máy tính bảng</a></li>
            <li><a href="#">Phụ kiện</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Hỗ trợ</h3>
          <ul>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Giao hàng</a></li>
            <li><a href="#">Đổi trả</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Kết nối</h3>
          <div className="social-icons">
            <span>FB</span> <span>IG</span> <span>TW</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 StoreFront. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
