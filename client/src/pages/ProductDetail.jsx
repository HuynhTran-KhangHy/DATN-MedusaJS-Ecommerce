import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div style={{display: 'flex', gap: '50px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: 'var(--shadow)'}}>
      <div style={{flex: 1, height: '400px', background: '#f1f5f9', borderRadius: '15px'}}></div>
      <div style={{flex: 1}}>
        <span style={{color: 'var(--primary)', fontWeight: '600', fontSize: '0.8rem'}}>DANH MỤC ABC</span>
        <h1 style={{marginTop: '10px', fontSize: '2.5rem'}}>Sản phẩm ID: {id}</h1>
        <p style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', margin: '20px 0'}}>15.000.000đ</p>
        <p style={{color: 'var(--text-muted)', marginBottom: '30px'}}>
          Đây là mô tả chi tiết cho sản phẩm {id}. Sản phẩm này có tính năng vượt trội, 
          thiết kế tinh tế và hiệu năng mạnh mẽ phù hợp với nhu cầu của bạn.
        </p>
        <div style={{display: 'flex', gap: '15px'}}>
          <button style={{flex: 1, padding: '15px', background: 'var(--primary)', color: 'white', borderRadius: '10px', fontWeight: '600'}}>
            Thêm vào giỏ hàng
          </button>
          <button style={{padding: '15px 25px', border: '1px solid var(--border)', borderRadius: '10px'}}>
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
