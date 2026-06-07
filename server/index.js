const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API đang chạy!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  await connectDB();
});