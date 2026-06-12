const User = require('../models/User');

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error: error.message });
  }
};

// Cập nhật trạng thái khóa/mở tài khoản
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 0: Locked, 1: Active

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Không cho phép Admin tự khóa chính mình (Optional but safe)
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Bạn không thể tự khóa tài khoản của chính mình!' });
    }

    user.status = status;
    await user.save();

    res.json({ message: `Đã ${status === 0 ? 'khóa' : 'mở'} tài khoản thành công`, user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái', error: error.message });
  }
};

// Cập nhật vai trò (Cấp/Thu hồi quyền Seller)
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // 0: Buyer, 2: Seller

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Ngăn chặn việc thay đổi role của Admin từ đây (an toàn hơn)
    if (user.role === 1) {
      return res.status(400).json({ message: 'Không thể thay đổi quyền của quản trị viên!' });
    }

    user.role = role;
    await user.save();

    res.json({ 
      message: `Đã cập nhật vai trò thành ${role === 2 ? 'Seller' : 'Người mua'} thành công`, 
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật vai trò', error: error.message });
  }
};
