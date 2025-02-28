const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    res.status(201).json({ message: "Registrasi berhasil!", user });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan di server", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    // Generate refresh token
    const refresh_token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in DB
    user.refresh_token = refresh_token;
    await user.save();

    res.json({
      message: "Login berhasil!",
      refresh_token,
      user: { 
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan di server", error: err.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  const { token } = req.body;
  try {
    // Find user by refresh token
    const user = await User.findOne({ where: { refresh_token: token } });
    if (!user) {
      return res.status(403).json({ message: "Token tidak valid!" });
    }

    // Nullify refresh token
    await User.update(
      { refresh_token: null },
      { where: { id: user.id } }
    );

    res.json({ message: "Logout berhasil!" });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan di server", error: err.message });
  }
};

// Request reset password link
exports.requestReset = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    // Create reset token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send reset email
    await transporter.sendMail({
      to: email,
      subject: "Reset Password",
      text: `Klik link ini untuk reset password: ${resetLink}`,
    });

    res.json({ message: "Link reset password telah dikirim ke email!" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengirim email", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const userId = req.params.id;

  try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });

      res.json({ message: "Password successfully updated!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

