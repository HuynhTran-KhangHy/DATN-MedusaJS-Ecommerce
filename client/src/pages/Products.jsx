const Products = () => {
  return (
    <div>
      <h1 style={{marginBottom: '30px'}}>Tất cả sản phẩm</h1>
      <div style={{display: 'flex', gap: '30px'}}>
        <aside style={{width: '250px'}}>
          <h3>Danh mục</h3>
          <ul style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><input type="checkbox" /> Điện thoại</li>
            <li><input type="checkbox" /> Laptop</li>
            <li><input type="checkbox" /> Phụ kiện</li>
          </ul>
        </aside>
        <main style={{flex: 1}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px'}}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{background: 'white', padding: '15px', borderRadius: '12px', boxShadow: 'var(--shadow)'}}>
                <div style={{height: '180px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '15px'}}></div>
                <h4 style={{fontSize: '0.9rem'}}>Sản phẩm Demo #{i}</h4>
                <p style={{color: 'var(--primary)', fontWeight: '700', marginTop: '5px'}}>5.900.000đ</p>
                <button style={{width: '100%', marginTop: '10px', padding: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600'}}>
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
