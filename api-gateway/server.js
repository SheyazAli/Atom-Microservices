require('dotenv').config();

const express = require('express');
const settings = require('./config/settings');
const gatewayRoutes = require('./routes/gatewayRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Gateway Running' });
});

app.use('/api', gatewayRoutes);

app.listen(settings.port, () => {
  console.log(`API Gateway is running on port ${settings.port}`);
});
