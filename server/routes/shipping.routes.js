const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shipping.controller');

// GET /api/shipping/provinces
router.get('/provinces', shippingController.getProvinces);

// GET /api/shipping/districts?province_id=xxx
router.get('/districts', shippingController.getDistricts);

// GET /api/shipping/wards?district_id=xxx
router.get('/wards', shippingController.getWards);

// POST /api/shipping/calculate
router.post('/calculate', shippingController.calculateShipping);

module.exports = router;