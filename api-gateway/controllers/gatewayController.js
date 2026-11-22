const cartClient = require('../clients/cartClient');

async function applyCoupon(req, res) {
  const code = typeof req.body?.code === 'string' ? req.body.code.trim() : '';
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code is required'
    });
  }

  try {
    const upstream = await cartClient.applyCoupon({ code });
    return res.status(upstream.status).json(upstream.payload);
  } catch (error) {
    if (error.code === 'CART_SERVICE_UNAVAILABLE') {
      return res.status(503).json({ success: false, message: error.message });
    }

    if (error.code === 'CART_SERVICE_TIMEOUT') {
      return res.status(504).json({ success: false, message: error.message });
    }

    if (error.code === 'CART_SERVICE_INVALID_RESPONSE') {
      return res.status(502).json({ success: false, message: error.message });
    }

    console.error('API Gateway error:', error);
    return res.status(500).json({
      success: false,
      message: 'API Gateway could not forward the request'
    });
  }
}

module.exports = { applyCoupon };
