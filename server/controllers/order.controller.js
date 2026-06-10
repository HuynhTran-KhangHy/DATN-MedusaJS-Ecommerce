const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const ShippingAddress = require('../models/ShippingAddress');
const ProductVariant = require('../models/ProductVariant');
const { sequelize } = require('../db');
const { orderQueue } = require('../jobs/queue');

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
      email,
      note,
      paymentMethod,
      paymentStatus: 'unpaid',
      shippingFee,
      subtotal,
      total,
      status: 'pending'
    }, { transaction: t });

    // Create Shipping Address
    await ShippingAddress.create({
      orderId: newOrder.id,
      fullName,
      phone,
      province,
      district,
      ward,
      address
    }, { transaction: t });

    // Create Order Items & Deduct Inventory
    for (const item of items) {
      // Create Order Item
      await OrderItem.create({
        orderId: newOrder.id,
        productId: item.id, // Assuming item.id is variantId or productId
        productName: item.name,
        variant: item.variant,
        price: item.price,
        quantity: item.quantity
      }, { transaction: t });

      // Deduct inventory
      await ProductVariant.decrement('inventoryQuantity', {
        by: item.quantity,
        where: { id: item.id },
        transaction: t
      });
    }

    await t.commit();

    // Push job to queue for background processing (email, inventory, etc.)
    await orderQueue.add('processOrder', { orderId: newOrder.id }, {
      attempts: 3, // Retry up to 3 times if fails
      backoff: { type: 'exponential', delay: 2000 } // Wait 2s, 4s, 8s between retries
    });

    res.status(201).json({
      message: 'Đặt hàng thành công! Đơn hàng đang được xử lý.',
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
