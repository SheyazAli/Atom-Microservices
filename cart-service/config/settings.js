module.exports = {
  port: Number(process.env.PORT) || 3002,
  couponServiceUrl: process.env.COUPON_SERVICE_URL,
  couponServiceTimeoutMs: Number(process.env.COUPON_SERVICE_TIMEOUT_MS) || 3000,
  testCart: {
    userId: process.env.TEST_CART_USER_ID || 'cart-service-test-user',
    subtotal: Number(process.env.TEST_CART_SUBTOTAL) || 2800
  }
};
