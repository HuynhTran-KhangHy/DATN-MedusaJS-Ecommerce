const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (for now)
router.post('/', orderController.createOrder);

module.exports = router;
