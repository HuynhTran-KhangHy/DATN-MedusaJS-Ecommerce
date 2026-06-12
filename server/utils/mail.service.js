const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendApprovalEmail = async (userEmail, productName, status, reason = '') => {
  const isApproved = status === 'approved';
  
  const mailOptions = {
    from: `"ShopFlow Admin" <${process.env.MAIL_USER}>`,
    to: userEmail,
    subject: `[ShopFlow] Thông báo kết quả duyệt sản phẩm: ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: ${isApproved ? '#22C55E' : '#EF4444'}; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Thông báo kết quả duyệt</h1>
        </div>
        <div style="padding: 20px; line-height: 1.6; color: #333;">
          <p>Xin chào,</p>
          <p>Hệ thống ShopFlow đã hoàn tất kiểm duyệt sản phẩm của bạn:</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <strong>Sản phẩm:</strong> ${productName}<br>
            <strong>Trạng thái:</strong> <span style="color: ${isApproved ? '#22C55E' : '#EF4444'}; font-weight: bold;">
              ${isApproved ? 'ĐÃ ĐƯỢC DUYỆT' : 'BỊ TỪ CHỐI'}
            </span>
          </div>
          ${!isApproved && reason ? `<p><strong>Lý do từ chối:</strong> ${reason}</p>` : ''}
          <p>${isApproved 
            ? 'Sản phẩm của bạn hiện đã hiển thị công khai trên sàn thương mại điện tử ShopFlow. Chúc bạn buôn may bán đắt!' 
            : 'Vui lòng thực hiện chỉnh sửa lại thông tin sản phẩm theo lý do trên và gửi duyệt lại.'}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">Đây là email tự động từ hệ thống, vui lòng không phản hồi email này.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email thông báo đã được gửi thành công!');
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};
