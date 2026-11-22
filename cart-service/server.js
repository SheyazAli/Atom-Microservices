require('dotenv').config();

const express = require('express');
const settings = require('./config/settings');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Cart Service Running' });
});

app.use('/api/cart', cartRoutes);

app.use((err, req, res, next) => {
  console.error('Cart Service error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(settings.port, () => {
  console.log(`Cart Service is running on port ${settings.port}`);
});
