const couponClient = require('../clients/couponClient');
const settings = require('../config/settings');

async function applyCoupon(code) {
  const result = await couponClient.applyCoupon({
    code,
    userId: settings.testCart.userId,
    subtotal: settings.testCart.subtotal
  });

  if (!result.payload?.success || result.status < 200 || result.status >= 300) {
    const error = new Error(result.payload?.message || 'Coupon could not be applied');
    error.statusCode = result.status >= 400 && result.status < 500 ? 400 : 502;
    throw error;
  }

  const discount = Number(result.payload.data?.discount);
  if (!Number.isFinite(discount) || discount < 0) {
    const error = new Error('Coupon Service returned an invalid discount');
    error.statusCode = 502;
    throw error;
  }

  return {
    couponCode: result.payload.data.couponCode,
    subtotal: settings.testCart.subtotal,
    discount,
    finalAmount: Math.max(settings.testCart.subtotal - discount, 0)
  };
}

module.exports = { applyCoupon };
