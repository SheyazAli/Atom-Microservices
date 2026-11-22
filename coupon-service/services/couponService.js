
const Coupon = require('../models/couponModel');

//Apply Coupon

const applyCoupon = async ({ code, userId, subtotal }) => {

    // 1. Find coupon
    const coupon = await Coupon.findOne({
        coupon_code: code.toUpperCase()
    });

    if (!coupon) {
        throw new Error('Invalid coupon code');
    }

    // 2. Check coupon status
    if (!coupon.status) {
        throw new Error('Coupon is inactive');
    }

    // 3. Check expiry
    if (new Date() > coupon.expiry_date) {
        throw new Error('Coupon has expired');
    }

    // 4. Check previous usage
    if (coupon.user_ids.some(id => id.toString() === userId.toString())) {
        throw new Error('Coupon already used');
    }

    // 5. Check minimum purchase
    if (subtotal < coupon.minimum_purchase) {
        throw new Error('Minimum purchase requirement not met');
    }

    // 6. Calculate discount
    let discount = 0;

    if (coupon.discount_type === 'flat') {
        discount = coupon.discount_value;
    }
    else if (coupon.discount_type === 'percentage') {
        discount = (subtotal * coupon.discount_value) / 100;

        if (coupon.maximum_discount) {
            discount = Math.min(discount, coupon.maximum_discount);
        }
    }
    else {
        throw new Error('BOGO coupons are not supported yet');
    }

    // Discount cannot exceed subtotal
    discount = Math.min(discount, subtotal);

    return {
        couponId: coupon._id,
        couponCode: coupon.coupon_code,
        discount
    };
};

//create Coupon

const createCoupon = async (couponData) => {

    const {
        coupon_code,
        description,
        discount_type,
        discount_value,
        minimum_purchase,
        maximum_discount,
        expiry_date
    } = couponData;

    // Check whether coupon already exists
    const existingCoupon = await Coupon.findOne({
        coupon_code: coupon_code.toUpperCase()
    });

    if (existingCoupon) {
        throw new Error('Coupon code already exists');
    }

    // Create new coupon
    const newCoupon = await Coupon.create({
        coupon_code,
        description,
        discount_type,
        discount_value,
        minimum_purchase,
        maximum_discount,
        expiry_date
    });

    return newCoupon;
};


module.exports = {
    applyCoupon,
    createCoupon
};
