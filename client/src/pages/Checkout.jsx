import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  // Mock Cart Data
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Áo thun tay lỡ Xóm Tíu',
      variant: 'Đen / L',
      price: 150000,
      quantity: 2,
      image: 'https://placehold.co/100x100?text=Ao+Thun'
    },
    {
      id: 2,
      name: 'Quần short kaki túi hộp',
      variant: 'Rêu / XL',
      price: 220000,
      quantity: 1,
      image: 'https://placehold.co/100x100?text=Quan+Short'
    }
  ]);

  const [shippingFee, setShippingFee] = useState(0);

  // GHN Location State
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: '', // Stores province_id
    district: '', // Stores district_id
    ward: '',     // Stores ward_code
    address: '',
    note: '',
    paymentMethod: 'cod'
  });

  const GHN_TOKEN = import.meta.env.VITE_GHN_API_TOKEN;
  const GHN_SHOP_ID = import.meta.env.VITE_GHN_SHOP_ID;

  // Fetch Provinces on Mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: { 'token': GHN_TOKEN }
        });
        const data = await response.json();
        if (data.code === 200) setProvinces(data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    if (GHN_TOKEN) fetchProvinces();
  }, [GHN_TOKEN]);

  // Fetch Districts when Province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.province) {
        setDistricts([]);
        setWards([]);
        return;
      }
      try {
        const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${formData.province}`, {
          headers: { 'token': GHN_TOKEN }
        });
        const data = await response.json();
        if (data.code === 200) setDistricts(data.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, [formData.province, GHN_TOKEN]);

  // Fetch Wards when District changes
  useEffect(() => {
    const fetchWards = async () => {
      if (!formData.district) {
        setWards([]);
        return;
      }
      try {
        const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${formData.district}`, {
          headers: { 'token': GHN_TOKEN }
        });
        const data = await response.json();
        if (data.code === 200) setWards(data.data);
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    };
    fetchWards();
  }, [formData.district, GHN_TOKEN]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + shippingFee;

  // Calculate Shipping Fee when Ward is selected
  useEffect(() => {
    const calculateFee = async () => {
      if (!formData.district || !formData.ward) {
        setShippingFee(0);
        return;
      }

      try {
        const totalWeight = cartItems.reduce((total, item) => total + (200 * item.quantity), 0); // Estimate 200g per item

        const payload = {
          service_type_id: 2, // Standard E-commerce delivery
          insurance_value: subtotal,
          to_district_id: parseInt(formData.district),
          to_ward_code: formData.ward,
          weight: totalWeight || 200
        };

        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': GHN_TOKEN,
            'shop_id': GHN_SHOP_ID
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.code === 200 && data.data) {
          setShippingFee(data.data.total);
        } else {
          console.error('GHN Fee API Error:', data.message);
          setShippingFee(30000); // Fallback fee if API fails or service unsupported
        }
      } catch (error) {
        console.error('Error calculating shipping fee:', error);
        setShippingFee(30000); // Fallback fee
      }
    };

    if (GHN_TOKEN && GHN_SHOP_ID) {
      calculateFee();
    }
  }, [formData.district, formData.ward, GHN_TOKEN, GHN_SHOP_ID, subtotal, cartItems]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Reset dependent fields when parent changes
    if (name === 'province') {
      setFormData(prev => ({ ...prev, [name]: value, district: '', ward: '' }));
    } else if (name === 'district') {
      setFormData(prev => ({ ...prev, [name]: value, ward: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.province || !formData.district || !formData.ward) {
      alert("Vui lòng chọn đầy đủ địa chỉ giao hàng");
      return;
    }

    try {
      const orderPayload = {
        ...formData,
        shippingFee,
        subtotal,
        total,
        items: cartItems
      };

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Đặt hàng thành công! Mã đơn hàng: " + data.orderId);
        // Ở đây có thể điều hướng sang trang Success (ví dụ: navigate('/order-success'))
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>THANH TOÁN</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <Link to="/cart">Giỏ hàng</Link> / <span>Thanh toán</span>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="checkout-layout">

            {/* LEFT COLUMN: User Info & Shipping */}
            <div className="checkout-main">
              <div className="checkout-section">
                <h3 className="checkout-section-title">
                  <i className="ri-user-line"></i> Thông tin giao hàng
                </h3>

                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ tên người nhận"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Số điện thoại *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email (Tùy chọn)</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email để nhận hóa đơn"
                    />
                  </div>
                </div>

                <div className="form-row mt-1">
                  <div className="form-group">
                    <label className="form-label">Tỉnh / Thành phố *</label>
                    <select
                      className="form-control"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Chọn Tỉnh / Thành phố --</option>
                      {provinces.map(p => (
                        <option key={p.ProvinceID} value={p.ProvinceID}>{p.ProvinceName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quận / Huyện *</label>
                    <select
                      className="form-control"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.province}
                    >
                      <option value="">-- Chọn Quận / Huyện --</option>
                      {districts.map(d => (
                        <option key={d.DistrictID} value={d.DistrictID}>{d.DistrictName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phường / Xã *</label>
                    <select
                      className="form-control"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.district}
                    >
                      <option value="">-- Chọn Phường / Xã --</option>
                      {wards.map(w => (
                        <option key={w.WardCode} value={w.WardCode}>{w.WardName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Địa chỉ cụ thể *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, tên đường..."
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-1">
                  <label className="form-label">Ghi chú đơn hàng (Tùy chọn)</label>
                  <textarea
                    className="form-control"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Giao ngoài giờ hành chính..."
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="checkout-section mt-15">
                <h3 className="checkout-section-title">
                  <i className="ri-bank-card-line"></i> Phương thức thanh toán
                </h3>
                <div className="payment-method-list">
                  <label className={`payment-method ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <div className="payment-method-icon"><i className="ri-truck-line text-accent"></i></div>
                    <div className="payment-method-name">Thanh toán khi nhận hàng (COD)</div>
                  </label>
                  <label className={`payment-method ${formData.paymentMethod === 'momo' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleInputChange}
                    />
                    <div className="payment-method-icon"><i className="ri-wallet-3-line text-danger"></i></div>
                    <div className="payment-method-name">Thanh toán qua ví MoMo</div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="checkout-sidebar">
              <div className="cart-summary">
                <h3>ĐƠN HÀNG CỦA BẠN</h3>

                <div className="checkout-items-list mb-15">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item" style={{ padding: '0.8rem 0' }}>
                      <div className="checkout-mini-img">
                        <img src={item.image} alt={item.name} />
                        <span className="checkout-qty-badge">{item.quantity}</span>
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name text-sm">{item.name}</div>
                        <div className="cart-item-variant text-xs">{item.variant}</div>
                      </div>
                      <div className="cart-item-price text-sm fw-700">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-row mt-1">
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span className="fw-700">{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span>{shippingFee === 0 ? 'Chưa xác định' : `${shippingFee.toLocaleString()}đ`}</span>
                </div>

                <div className="summary-row total mt-1 pt-1" style={{ borderTop: '1px solid var(--border)' }}>
                  <span>TỔNG CỘNG</span>
                  <span className="text-accent" style={{ fontSize: '1.4rem' }}>{total.toLocaleString()}đ</span>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-15 btn-lg">
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
