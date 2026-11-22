module.exports = {
  port: Number(process.env.PORT) || 3000,
  cartServiceUrl: process.env.CART_SERVICE_URL,
  cartServiceTimeoutMs: Number(process.env.CART_SERVICE_TIMEOUT_MS) || 3000
};
