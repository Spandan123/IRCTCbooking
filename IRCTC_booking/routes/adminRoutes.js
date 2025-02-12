const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Add a new train (protected by admin API key)
router.post('/trains', adminController.addTrain);

module.exports = router;