const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTP } = require('../utils/mailer');
const router = express.Router();

// 1. ĐĂNG KÝ
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo OTP (6 chữ số)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

    // Lưu user (chưa xác thực)
    await User.create({
      email,
      password: hashedPassword,
      otp,
      otp_expiry: otpExpiry,
      is_verified: false
    });

    // Gửi OTP qua email
    console.log(`Mã OTP của ${email} là: ${otp}`);
    await sendOTP(email, otp);

    res.status(201).json({ message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã OTP.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

// 2. XÁC THỰC OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Kiểm tra OTP và hết hạn
    if (user.otp !== otp || new Date() > user.otp_expiry) {
      return res.status(400).json({ message: 'Mã OTP không chính xác hoặc đã hết hạn.' });
    }

    // Cập nhật trạng thái xác thực
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
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    // Kiểm tra xác thực
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Tài khoản chưa được xác thực email.' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Đăng nhập thành công.',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error: error.message });
  }
});

module.exports = router;
