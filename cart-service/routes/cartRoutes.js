const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/apply-coupon', cartController.applyCoupon);

module.exports = router;
