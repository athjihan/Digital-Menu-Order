// src/routes/sellerRoutes.js
const express = require('express');
const {
  showDashboard,
  confirmOrder,
  addMenu,
  updateAvailability,
  checkIncome
} = require('../controllers/sellerController');
const router = express.Router();

router.get('/seller', showDashboard);
router.post('/confirm-order', confirmOrder);
router.post('/add-menu', addMenu);
router.post('/update-availability', updateAvailability);
router.post('/check-income', checkIncome);

module.exports = router;