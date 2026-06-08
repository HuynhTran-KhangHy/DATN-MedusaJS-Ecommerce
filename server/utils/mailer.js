const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Mã xác thực OTP của bạn',
    text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
    html: `<h3>Mã xác thực OTP</h3><p>Mã OTP của bạn là: <b>${otp}</b></p><p>Mã này có hiệu lực trong 5 phút.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP đã được gửi đến ${email}`);
    return true;
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    return false;
  }
};

module.exports = { sendOTP };
