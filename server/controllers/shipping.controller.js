const axios = require('axios');
const ApiResponse = require('../utils/response');

const GHN_TOKEN = process.env.GHN_TOKEN;
const GHN_SHOP_ID = process.env.GHN_SHOP_ID;
const GHN_BASE_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';

// Lấy danh sách tỉnh/thành
exports.getProvinces = async (req, res) => {
  try {
    if (!GHN_TOKEN) {
      return ApiResponse.error(res, 'Thiếu cấu hình GHN token.', 500);
    }

    const response = await axios.get(`${GHN_BASE_URL}/master-data/province`, {
      headers: { 'Token': GHN_TOKEN }
    });

    return res.json({ success: true, message: 'Lấy danh sách tỉnh/thành thành công!', data: response.data });
  } catch (error) {
    return ApiResponse.error(res, 'Lỗi lấy danh sách tỉnh/thành.', 500, error.message);
  }
};

// Lấy danh sách quận/huyện theo tỉnh
exports.getDistricts = async (req, res) => {
  try {
    if (!GHN_TOKEN) {
      return ApiResponse.error(res, 'Thiếu cấu hình GHN token.', 500);
    }

    const { province_id } = req.query;
    if (!province_id) {
      return ApiResponse.error(res, 'Thiếu province_id để lấy danh sách quận/huyện.', 400);
    }

    const response = await axios.get(`${GHN_BASE_URL}/master-data/district`, {
      headers: { 'Token': GHN_TOKEN },
      params: { province_id }
    });

    return res.json({ success: true, message: 'Lấy danh sách quận/huyện thành công!', data: response.data });
  } catch (error) {
    return ApiResponse.error(res, 'Lỗi lấy danh sách quận/huyện.', 500, error.message);
  }
};

// Lấy danh sách phường/xã theo huyện
exports.getWards = async (req, res) => {
  try {
    if (!GHN_TOKEN) {
      return ApiResponse.error(res, 'Thiếu cấu hình GHN token.', 500);
    }

    const { district_id } = req.query;
    if (!district_id) {
      return ApiResponse.error(res, 'Thiếu district_id để lấy danh sách phường/xã.', 400);
    }

    const response = await axios.get(`${GHN_BASE_URL}/master-data/ward`, {
      headers: { 'Token': GHN_TOKEN },
      params: { district_id }
    });

    return res.json({ success: true, message: 'Lấy danh sách phường/xã thành công!', data: response.data });
  } catch (error) {
    return ApiResponse.error(res, 'Lỗi lấy danh sách phường/xã.', 500, error.message);
  }
};

// Tính phí ship
exports.calculateShipping = async (req, res) => {
  try {
    if (!GHN_TOKEN || !GHN_SHOP_ID) {
      return ApiResponse.error(res, 'Thiếu cấu hình GHN token hoặc shop ID.', 500);
    }

    const { to_district_id, to_ward_code, weight, insurance_value } = req.body;

    if (!to_district_id || !to_ward_code) {
      return ApiResponse.error(res, 'Thiếu to_district_id hoặc to_ward_code khi tính phí ship.', 400);
    }

    const response = await axios.post(
      `${GHN_BASE_URL}/v2/shipping-order/fee`,
      {
        shop_id: parseInt(GHN_SHOP_ID),
        service_type_id: 2, // Giao hàng nhanh
        to_district_id: parseInt(to_district_id),
        to_ward_code: String(to_ward_code),
        weight: parseInt(weight) || 500, // gram
        insurance_value: parseInt(insurance_value) || 0,
      },
      {
        headers: {
          'Token': GHN_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({
      success: true,
      message: 'Tính phí ship GHN thành công!',
      data: response.data
    });
  } catch (error) {
    return ApiResponse.error(res, 'Lỗi tính phí ship GHN.', 500, error.message);
  }
};