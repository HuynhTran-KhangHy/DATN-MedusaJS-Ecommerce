const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./db');
// Load models
require('./models');

const passport = require('./config/passport');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const seedData = require('./seed');

// Initialize Queue Worker
require('./jobs/queue');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
const shippingRoutes = require('./routes/shipping.routes');
app.use('/api/shipping', shippingRoutes);
app.use('/api/admin', require('./routes/admin.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'API đang chạy!' });
});

// Global error handler
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  await connectDB();
  // Đồng bộ database
  try {
    await sequelize.sync({ alter: true });
    await seedData(); // Khởi tạo dữ liệu mẫu
    console.log('Database đã được đồng bộ và seed dữ liệu!');
  } catch (error) {
    console.error('Lỗi đồng bộ database:', error);
  }
});