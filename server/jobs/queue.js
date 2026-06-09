const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

// Redis connection configuration
// Replace with your actual Redis credentials if using cloud (Upstash, Render) or Docker
const connection = process.env.REDIS_URL 
  ? new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null })
  : new IORedis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null // Required by BullMQ
    });

// Initialize Order Queue
const orderQueue = new Queue('orderQueue', { connection });

// Initialize Worker
const orderWorker = new Worker('orderQueue', async job => {
  if (job.name === 'processOrder') {
    const { orderId } = job.data;
    console.log(`[Queue] Bắt đầu xử lý đơn hàng #${orderId}`);
    
    // Giả lập thời gian xử lý các tác vụ nặng (như gửi email, trừ tồn kho, etc.)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // TODO: Viết logic trừ tồn kho sản phẩm tại đây
    // TODO: Viết logic gửi email xác nhận tại đây

    console.log(`[Queue] ✅ Xử lý xong đơn hàng #${orderId}`);
    return { status: 'success', orderId };
  }
}, { connection });

orderWorker.on('completed', job => {
  console.log(`[Queue] Job ${job.id} đã hoàn thành!`);
});

orderWorker.on('failed', (job, err) => {
  console.log(`[Queue] ❌ Job ${job.id} bị lỗi: ${err.message}`);
});

module.exports = { orderQueue, connection };
