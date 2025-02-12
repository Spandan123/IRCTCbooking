const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route: Register a new user
router.post('/register', authController.registerUser);

// Route: Login a user
router.post('/login', authController.loginUser);

module.exports = router;