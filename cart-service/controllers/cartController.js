const cartService = require('../services/cartService');

async function applyCoupon(req, res) {
  const code = typeof req.body?.code === 'string' ? req.body.code.trim() : '';
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  try {
    const data = await cartService.applyCoupon(code);
    return res.status(200).json({
      success: true,
      message: 'Coupon applied successfully',
      data
    });
  } catch (error) {
    const status = error.statusCode || (
      ['COUPON_SERVICE_UNAVAILABLE', 'COUPON_SERVICE_TIMEOUT'].includes(error.code)
        ? 503
        : error.code?.startsWith('COUPON_SERVICE_')
          ? 502
          : 500
    );
    return res.status(status).json({ success: false, message: error.message });
  }
}

module.exports = { applyCoupon };
