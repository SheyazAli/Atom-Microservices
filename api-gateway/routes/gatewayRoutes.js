const express = require('express');
const gatewayController = require('../controllers/gatewayController');

const router = express.Router();

router.post('/cart/apply-coupon', gatewayController.applyCoupon);

module.exports = router;
