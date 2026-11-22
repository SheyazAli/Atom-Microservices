const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

    coupon_code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },

    description: {
        type: String,
        required: true
    },

    discount_type: {
        type: String,
        enum: ['flat', 'percentage', 'bogo'],
        required: true
    },

    discount_value: {
        type: Number,
        required: true
    },

    minimum_purchase: {
        type: Number,
        default: 0
    },

    maximum_discount: {
        type: Number,
        default: null
    },

    expiry_date: {
        type: Date,
        required: true
    },

    user_ids: [{
        type: mongoose.Schema.Types.ObjectId
    }],

    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;