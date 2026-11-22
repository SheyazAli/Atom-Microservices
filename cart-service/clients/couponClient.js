const settings = require('../config/settings');

async function applyCoupon({ code, userId, subtotal }) {
  if (!settings.couponServiceUrl) {
    const error = new Error('Coupon Service URL is not configured');
    error.code = 'COUPON_SERVICE_CONFIG_ERROR';
    throw error;
  }

  let response;
  try {
    response = await fetch(
      `${settings.couponServiceUrl.replace(/\/$/, '')}/api/user/coupons/apply`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, userId, subtotal }),
        signal: AbortSignal.timeout(settings.couponServiceTimeoutMs)
      }
    );
  } catch (cause) {
    const error = new Error(
      cause.name === 'TimeoutError'
        ? 'Coupon Service request timed out'
        : 'Coupon Service is unavailable'
    );
    error.code = cause.name === 'TimeoutError' ? 'COUPON_SERVICE_TIMEOUT' : 'COUPON_SERVICE_UNAVAILABLE';
    error.cause = cause;
    throw error;
  }

  let payload;
  try {
    payload = await response.json();
  } catch (cause) {
    const error = new Error('Coupon Service returned an invalid response');
    error.code = 'COUPON_SERVICE_INVALID_RESPONSE';
    error.cause = cause;
    throw error;
  }

  return { status: response.status, payload };
}

module.exports = { applyCoupon };
