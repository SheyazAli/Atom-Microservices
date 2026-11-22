const express = require('express');
const router = express.Router();

const adminCouponController = require('../controllers/admincouponController');

router.post('/', adminCouponController.createCoupon);

module.exports = router;