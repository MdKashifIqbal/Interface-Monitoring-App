// routes/userRoutes.js

const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

// POST register new user
router.post('/register', registerUser);

// POST login user
router.post('/login', loginUser);

module.exports = router;
