const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const { sendOTP } = require('../utils/mailer');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

// Cấu hình Multer để upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/avatars';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)!'));
  }
});

// 1. ĐĂNG KÝ
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await User.create({
      email,
      password: hashedPassword,
      fullName,
      otp,
      otp_expiry: otpExpiry,
      is_verified: false
    });

    console.log(`Mã OTP của ${email} là: ${otp}`);
    await sendOTP(email, otp);

    res.status(201).json({ message: 'Đăng ký thành công. Vui lòng kiểm tra mã OTP.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

// 2. XÁC THỰC OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại.' });

    if (user.otp !== otp || new Date() > user.otp_expiry) {
      return res.status(400).json({ message: 'Mã OTP không chính xác hoặc đã hết hạn.' });
    }

    user.is_verified = true;
    user.otp = null;
    user.otp_expiry = null;
    await user.save();

    res.json({ message: 'Xác thực thành công. Bạn có thể đăng nhập ngay.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

// 3. ĐĂNG NHẬP
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Tài khoản chưa được xác thực email.' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Đăng nhập thành công.',
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

// 4. LẤY THÔNG TIN CÁ NHÂN (Protected)
router.get('/me', protect, async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    fullName: req.user.fullName,
    avatar: req.user.avatar
  });
});

// 5. CẬP NHẬT HỒ SƠ (Protected)
router.put('/profile', protect, async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = req.user;

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({
      message: 'Cập nhật hồ sơ thành công.',
      user: { id: user.id, email: user.email, fullName: user.fullName, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

// 6. UPLOAD AVATAR (Protected)
router.post('/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file để upload.' });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    req.user.avatar = avatarPath;
    await req.user.save();

    res.json({
      message: 'Upload ảnh đại diện thành công.',
      avatar: avatarPath
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi upload.', error: error.message });
  }
});

module.exports = router;
