import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: '',
    category_id: '',
    seller_id: 1 // Default for now
  });

  const [variants, setVariants] = useState([
    { variant_name: '', price: '', stock: '', attributes: { color: '', size: '' } }
  ]);

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi lấy danh mục:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    if (field === 'color' || field === 'size') {
      newVariants[index].attributes[field] = value;
    } else {
      newVariants[index][field] = value;
    }
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { variant_name: '', price: '', stock: '', attributes: { color: '', size: '' } }]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removePreview = (index) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category_id) {
        alert('Vui lòng chọn danh mục');
        return;
    }
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('base_price', formData.base_price);
    data.append('category_id', formData.category_id);
    data.append('seller_id', formData.seller_id);
    data.append('variants', JSON.stringify(variants));
    
    images.forEach(img => {
      data.append('images', img);
    });

    try {
      await axios.post('http://localhost:3000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Thêm sản phẩm thành công!');
      navigate('/seller/products');
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      alert('Đã xảy ra lỗi khi lưu sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content-inner">
      <div className="admin-page-header">
        <div>
          <h2 className="topbar-title" style={{ fontSize: '1.5rem' }}>Thêm sản phẩm mới</h2>
          <div className="admin-page-header-meta">Điền đầy đủ thông tin để đăng sản phẩm lên cửa hàng</div>
        </div>
        <div className="admin-page-header-actions">
           <button type="button" onClick={() => navigate('/seller/products')} className="admin-btn admin-btn-outline">Hủy bỏ</button>
           <button type="submit" form="product-form" className="admin-btn admin-btn-primary" disabled={loading}>
             <i className="bi bi-check-lg"></i> {loading ? 'Đang lưu...' : 'Đăng sản phẩm'}
           </button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit}>
        <div className="dash-grid">
          <div className="dash-left-col">
            {/* THÔNG TIN CƠ BẢN */}
            <div className="admin-card mb-4">
              <div className="admin-card-header">
                <div className="admin-card-title">Thông tin cơ bản</div>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Tên sản phẩm *</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="admin-form-control" 
                    placeholder="Nhập tên sản phẩm (ví dụ: iPhone 15 Pro Max)" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Danh mục *</label>
                    <select name="category_id" className="admin-form-control" required onChange={handleInputChange}>
                      <option value="">Chọn danh mục...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Giá cơ bản (VND) *</label>
                    <input 
                        type="number" 
                        name="base_price" 
                        className="admin-form-control" 
                        placeholder="0" 
                        required 
                        onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Mô tả sản phẩm</label>
                  <textarea 
                    name="description" 
                    className="admin-form-control" 
                    rows="5" 
                    placeholder="Mô tả chi tiết về tính năng, công dụng..."
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* QUẢN LÝ BIẾN THỂ */}
            <div className="admin-card mb-4">
              <div className="admin-card-header">
                <div className="admin-card-title">Phiên bản sản phẩm (Variants)</div>
                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addVariant}>
                  <i className="bi bi-plus"></i> Thêm phiên bản
                </button>
              </div>
              <div className="admin-card-body p-0">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tên phiên bản</th>
                      <th>Giá (đ)</th>
                      <th>Kho</th>
                      <th>Thuộc tính</th>
                      <th style={{ width: '50px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((v, index) => (
                      <tr key={index}>
                        <td>
                          <input 
                            type="text" 
                            className="admin-form-control filter-select" 
                            placeholder="Màu Đen, 256GB..." 
                            required 
                            value={v.variant_name}
                            onChange={(e) => handleVariantChange(index, 'variant_name', e.target.value)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="admin-form-control filter-select" 
                            placeholder="0" 
                            required 
                            value={v.price}
                            onChange={(e) => handleVariantChange(index, 'price', e.target.value)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="admin-form-control filter-select" 
                            placeholder="0" 
                            required 
                            value={v.stock}
                            onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} 
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                             <input 
                                type="text" 
                                className="admin-form-control filter-select" 
                                placeholder="Màu" 
                                value={v.attributes.color}
                                onChange={(e) => handleVariantChange(index, 'color', e.target.value)} 
                             />
                             <input 
                                type="text" 
                                className="admin-form-control filter-select" 
                                placeholder="Size" 
                                value={v.attributes.size}
                                onChange={(e) => handleVariantChange(index, 'size', e.target.value)} 
                             />
                          </div>
                        </td>
                        <td>
                          <button type="button" className="action-btn delete" onClick={() => removeVariant(index)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="dash-right-col">
            {/* HÌNH ẢNH */}
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title">Hình ảnh sản phẩm</div>
              </div>
              <div className="admin-card-body">
                <label className="upload-zone-lg" style={{ display: 'block' }}>
                  <input type="file" multiple className="d-none" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                  <i className="bi bi-cloud-upload upload-zone-lg-icon"></i>
                  <div className="upload-zone-lg-title">Click để tải ảnh lên</div>
                  <div className="upload-zone-lg-hint">Hỗ trợ JPG, PNG (Tối đa 5MB)</div>
                </label>
                
                {previews.length > 0 && (
                  <div className="grid-3 mt-3">
                    {previews.map((url, i) => (
                      <div key={i} className="position-relative" style={{ position: 'relative' }}>
                        <img src={url} className="admin-product-img w-100" style={{ width: '100%', height: '80px', objectFit: 'cover' }} alt="Preview" />
                        <button 
                            type="button" 
                            onClick={() => removePreview(i)}
                            style={{ 
                                position: 'absolute', 
                                top: '-5px', 
                                right: '-5px', 
                                background: 'var(--danger)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="admin-card mt-4">
              <div className="admin-card-body">
                <div className="admin-form-group">
                    <label className="admin-form-label">Trạng thái hiển thị</label>
                    <select className="admin-form-control">
                        <option value="1">Đang hoạt động</option>
                        <option value="0">Tạm ẩn</option>
                    </select>
                </div>
                <button type="submit" className="admin-btn admin-btn-primary w-100" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Đang xử lý...' : 'Đăng bán ngay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
