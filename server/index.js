const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./db');

const authRoutes = require('./routes/auth.routes');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API đang chạy!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  await connectDB();
  await sequelize.sync(); 
  console.log('Database đồng bộ thành công!');
});