const User = require('../models/User');
const mongoose = require('mongoose');

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const validUserId = new mongoose.Types.ObjectId(String(req.params.id));
    const user = await User.findById(validUserId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Get User by Username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};