const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
const Order = require('../models/Order');
require('dotenv').config();

// Redis connection configuration
let connection;
let orderQueue;
let orderWorker;

try {
  connection = process.env.REDIS_URL
    ? new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null })
    : new IORedis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        maxRetriesPerRequest: null
      });

  // Initialize Order Queue
  orderQueue = new Queue('orderQueue', { connection });

  // Initialize Worker
  orderWorker = new Worker('orderQueue', async job => {
    if (job.name === 'processOrder') {
      const { orderId } = job.data;
      console.log(`[Queue] Bắt đầu xử lý đơn hàng #${orderId}`);

      await new Promise(resolve => setTimeout(resolve, 3000));
      await Order.update({ status: 'processing' }, { where: { id: orderId } });

      console.log(`[Queue] ✅ Xử lý xong đơn hàng #${orderId}, trạng thái: processing`);
      return { status: 'success', orderId };
    }
  }, { connection });

  orderWorker.on('completed', job => {
    console.log(`[Queue] Job ${job.id} đã hoàn thành!`);
  });

  orderWorker.on('failed', (job, err) => {
    console.log(`[Queue] ❌ Job ${job.id} bị lỗi: ${err.message}`);
  });
} catch (error) {
  console.warn('Redis queue chưa sẵn sàng, bỏ qua khởi tạo worker:', error.message);
}

module.exports = { orderQueue, connection };
