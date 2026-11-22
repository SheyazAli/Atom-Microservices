const settings = require('../config/settings');

async function applyCoupon(body) {
  if (!settings.cartServiceUrl) {
    const error = new Error('Cart Service URL is not configured');
    error.code = 'CART_SERVICE_CONFIG_ERROR';
    throw error;
  }

  let response;
  try {
    response = await fetch(
      `${settings.cartServiceUrl.replace(/\/$/, '')}/api/cart/apply-coupon`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(settings.cartServiceTimeoutMs)
      }
    );
  } catch (cause) {
    const timedOut = cause.name === 'TimeoutError';
    const error = new Error(
      timedOut ? 'Cart Service request timed out' : 'Cart Service is unavailable'
    );
    error.code = timedOut ? 'CART_SERVICE_TIMEOUT' : 'CART_SERVICE_UNAVAILABLE';
    error.cause = cause;
    throw error;
  }

  let payload;
  try {
    payload = await response.json();
  } catch (cause) {
    const error = new Error('Cart Service returned an invalid JSON response');
    error.code = 'CART_SERVICE_INVALID_RESPONSE';
    error.cause = cause;
    throw error;
  }

  return { status: response.status, payload };
}

module.exports = { applyCoupon };
