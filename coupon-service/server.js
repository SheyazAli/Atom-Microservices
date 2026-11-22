const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminCouponRoutes = require('./routes/adminCouponRoutes');
const userCouponRoutes = require('./routes/userCouponRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Coupon Service Running');
});

app.use('/api/admin/coupons', adminCouponRoutes);
app.use('/api/user/coupons', userCouponRoutes);

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Coupon Service:', error.message);
        process.exit(1);
    }
};

startServer();