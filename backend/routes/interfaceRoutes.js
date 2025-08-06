const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Require auth middleware
const authorize = require('../middleware/authorize')

const { getAllInterfaces, addInterface } = require('../controllers/interfaceController');

// GET all interfaces (public, no auth needed)
router.get('/', getAllInterfaces);

// POST add a new interface (protected - only logged-in users)
router.post('/', auth,authorize('admin'), addInterface);

module.exports = router;
