const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Get trains by route (protected by JWT token)
router.get('/trains', userController.getTrainsByRoute);

// Book a seat (protected by JWT token)
router.post('/book', userController.bookSeat);

module.exports = router;