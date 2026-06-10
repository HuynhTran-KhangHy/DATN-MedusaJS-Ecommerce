import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: '',
    category_id: '',
  });

  const [variants, setVariants] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        axios.get('http://localhost:3000/api/categories'),
        axios.get(`http://localhost:3000/api/products/${id}`)
      ]);

      setCategories(catRes.data);
      
      const product = prodRes.data;
      setFormData({
        name: product.name,
        description: product.description || '',
        base_price: product.base_price,
        category_id: product.category_id,
      });

      setVariants(product.variants.map(v => ({
        ...v,
        attributes: typeof v.attributes === 'string' ? JSON.parse(v.attributes) : (v.attributes || { color: '', size: '' })
      })));
      
      setExistingImages(product.images);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      alert('Không thể lấy thông tin sản phẩm');
      navigate('/seller/products');
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

  const markImageForDeletion = (imageId) => {
    setDeleteImages([...deleteImages, imageId]);
    setExistingImages(existingImages.filter(img => img.id !== imageId));
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setNewPreviews([...newPreviews, ...previews]);
  };

  const removeNewPreview = (index) => {
    const previews = [...newPreviews];
    URL.revokeObjectURL(previews[index]);
    previews.splice(index, 1);
    setNewPreviews(previews);

    const images = [...newImages];
    images.splice(index, 1);
    setNewImages(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('base_price', formData.base_price);
    data.append('category_id', formData.category_id);
    data.append('variants', JSON.stringify(variants));
    data.append('deleteImages', JSON.stringify(deleteImages));
    
    newImages.forEach(img => {
      data.append('images', img);
    });

    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Cập nhật sản phẩm thành công!');
      navigate('/seller/products');
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      alert('Đã xảy ra lỗi khi cập nhật.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải dữ liệu...</div>;

  return (
    <div className="admin-content-inner">
      <div className="admin-page-header">
        <div>
          <h2 className="topbar-title" style={{ fontSize: '1.5rem' }}>Chỉnh sửa sản phẩm</h2>
          <div className="admin-page-header-meta">Cập nhật thông tin chi tiết cho sản phẩm #{id}</div>
        </div>
        <div className="admin-page-header-actions">
           <button type="button" onClick={() => navigate('/seller/products')} className="admin-btn admin-btn-outline">Hủy bỏ</button>
           <button type="submit" form="edit-product-form" className="admin-btn admin-btn-primary" disabled={saving}>
             <i className="bi bi-check-lg"></i> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
           </button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSubmit}>
        <div className="dash-grid">
          <div className="dash-left-col">
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
                    value={formData.name}
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Danh mục *</label>
                    <select name="category_id" className="admin-form-control" value={formData.category_id} required onChange={handleInputChange}>
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
                        value={formData.base_price}
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
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

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
                            value={v.variant_name}
                            required 
                            onChange={(e) => handleVariantChange(index, 'variant_name', e.target.value)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="admin-form-control filter-select" 
                            value={v.price}
                            required 
                            onChange={(e) => handleVariantChange(index, 'price', e.target.value)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className="admin-form-control filter-select" 
                            value={v.stock}
                            required 
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
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title">Hình ảnh hiện tại</div>
              </div>
              <div className="admin-card-body">
                <div className="grid-3 mb-3">
                  {existingImages.map((img) => (
                    <div key={img.id} className="position-relative">
                      <img src={`http://localhost:3000${img.image_url}`} className="admin-product-img w-100" style={{ width: '100%', height: '80px', objectFit: 'cover' }} alt="Product" />
                      <button 
                        type="button" 
                        onClick={() => markImageForDeletion(img.id)}
                        style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="sidebar-section-label" style={{ padding: '0 0 0.5rem', marginTop: '1rem' }}>Tải ảnh mới</div>
                <label className="upload-zone" style={{ display: 'block', padding: '1rem' }}>
                  <input type="file" multiple className="d-none" onChange={handleNewImageChange} accept="image/*" style={{ display: 'none' }} />
                  <i className="bi bi-plus-lg upload-zone-icon"></i>
                  <div className="upload-zone-hint">Thêm ảnh mới</div>
                </label>
                
                {newPreviews.length > 0 && (
                  <div className="grid-3 mt-3">
                    {newPreviews.map((url, i) => (
                      <div key={i} className="position-relative">
                        <img src={url} className="admin-product-img w-100" style={{ width: '100%', height: '80px', objectFit: 'cover', border: '2px solid var(--info)' }} alt="New Preview" />
                        <button 
                            type="button" 
                            onClick={() => removeNewPreview(i)}
                            style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
