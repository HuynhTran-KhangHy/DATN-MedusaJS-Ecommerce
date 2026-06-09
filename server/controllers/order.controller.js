const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { sequelize } = require('../db');

const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      fullName,
      phone,
      email,
      province,
      district,
      ward,
      address,
      note,
      paymentMethod,
      shippingFee,
      subtotal,
      total,
      items
    } = req.body;

    // Validate request
    if (!fullName || !phone || !province || !district || !ward || !address || !items || items.length === 0) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc và giỏ hàng không được rỗng.' });
    }

    // Create Order
    const newOrder = await Order.create({
      fullName,
      phone,
      email,
      province,
      district,
      ward,
      address,
      note,
      paymentMethod,
      shippingFee,
      subtotal,
      total,
      status: 'pending'
    }, { transaction: t });

    // Create Order Items
    const orderItemsData = items.map(item => ({
      orderId: newOrder.id,
      productId: item.id,
      productName: item.name,
      variant: item.variant,
      price: item.price,
      quantity: item.quantity
    }));

    await OrderItem.bulkCreate(orderItemsData, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: 'Đặt hàng thành công!',
      orderId: newOrder.id
    });

  } catch (error) {
    await t.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra khi tạo đơn hàng.', error: error.message });
  }
};

module.exports = {
  createOrder
};
