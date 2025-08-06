// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      passwordHash,
      role,
    });
    
    const savedUser = await newUser.save();
    console.log(savedUser)

    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Create JWT token
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
