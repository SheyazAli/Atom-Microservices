const express = require('express');
const router = express.Router();

const userCouponController = require('../controllers/usercouponController');

// Apply Coupon
router.post('/apply', userCouponController.applyCoupon);

module.exports = router;