const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

const verifyRefreshToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No refresh token provided' });
  }

  const refresh_token = authHeader.split(' ')[1];

  try {
    jwt.verify(refresh_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
      }

      // Check if the user exists and if the stored refresh token matches the provided one
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.refresh_token !== refresh_token) {
        return res.status(401).json({ message: 'Refresh token mismatch' });
      }

      // Attach the decoded user information to the request
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = verifyRefreshToken;
  