const couponService = require('../services/couponService');

const createCoupon = async (req, res) => {
    try {
        const {
            coupon_code,
            description,
            discount_type,
            discount_value,
            minimum_purchase,
            maximum_discount,
            expiry_date
        } = req.body;

        // Basic input validation
        if (
            !coupon_code ||
            !description ||
            !discount_type ||
            discount_value == null ||
            !expiry_date
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required coupon details'
            });
        }

        // Call service layer
        const coupon = await couponService.createCoupon({
            coupon_code,
            description,
            discount_type,
            discount_value,
            minimum_purchase,
            maximum_discount,
            expiry_date
        });

        return res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            data: coupon
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createCoupon };