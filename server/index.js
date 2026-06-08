const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./db');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth.routes');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());
// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API đang chạy!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  await connectDB();
  // Đồng bộ database
  try {
    await sequelize.sync({ alter: true });
    console.log('Database đã được đồng bộ!');
  } catch (error) {
    console.error('Lỗi đồng bộ database:', error);
  }
});