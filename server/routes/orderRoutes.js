const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    verifyPayment,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    getRazorpayKey,
    handleWebhook,
    refundOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/verify').post(protect, verifyPayment);
router.route('/config/razorpay').get(getRazorpayKey);
router.route('/webhook').post(handleWebhook);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/refund').post(protect, admin, refundOrder);

module.exports = router;

