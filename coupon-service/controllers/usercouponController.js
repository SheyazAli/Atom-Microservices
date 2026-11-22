
const couponService = require('../services/couponService');

const applyCoupon = async (req, res) => {
    try {
        const { code, userId, subtotal } = req.body;

        // Basic input validation
        if (!code || !userId || subtotal == null) {
            return res.status(400).json({
                success: false,
                message: 'Code, userId and subtotal are required'
            });
        }

        if (!Number.isFinite(Number(subtotal)) || Number(subtotal) < 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid subtotal'
            });
        }

        const result = await couponService.applyCoupon({
            code,
            userId,
            subtotal: Number(subtotal)
        });

        return res.status(200).json({
            success: true,
            message: 'Coupon applied successfully',
            data: result
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { applyCoupon };
