const Order = require('../models/Order');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// @desc    Create new order & Razorpay order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    try {
        // Create Razorpay order
        const options = {
            amount: Math.round(totalPrice * 100), // amount in the smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            paymentResult: {
                razorpay_order_id: razorpayOrder.id
            }
        });

        const createdOrder = await order.save();

        res.status(201).json({
            order: createdOrder,
            razorpayOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/orders/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const order = await Order.findById(orderId);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'paid',
                update_time: Date.now().toString(),
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } else {
        res.status(400).json({ message: 'Invalid payment signature' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.status = 'Delivered';

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get Razorpay Key for frontend
// @route   GET /api/orders/config/razorpay
// @access  Public
const getRazorpayKey = (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
};

// @desc    Razorpay Webhook Handler
// @route   POST /api/orders/webhook
// @access  Public (but verified with signature)
const handleWebhook = async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers['x-razorpay-signature'];

        // Verify webhook signature
        if (webhookSecret) {
            const expectedSignature = crypto
                .createHmac('sha256', webhookSecret)
                .update(JSON.stringify(req.body))
                .digest('hex');

            if (expectedSignature !== signature) {
                return res.status(400).json({ message: 'Invalid webhook signature' });
            }
        }

        const event = req.body.event;
        const paymentEntity = req.body.payload.payment.entity;

        // Handle different webhook events
        switch (event) {
            case 'payment.captured':
                // Payment was successful
                console.log('Payment captured:', paymentEntity.id);
                break;
            case 'payment.failed':
                // Payment failed
                console.log('Payment failed:', paymentEntity.id);
                break;
            case 'order.paid':
                // Order was paid
                console.log('Order paid:', paymentEntity.id);
                break;
            default:
                console.log('Unhandled webhook event:', event);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Refund order payment
// @route   POST /api/orders/:id/refund
// @access  Private/Admin
const refundOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!order.isPaid) {
            return res.status(400).json({ message: 'Order is not paid yet' });
        }

        if (!order.paymentResult.razorpay_payment_id) {
            return res.status(400).json({ message: 'Payment ID not found' });
        }

        // Create refund in Razorpay
        const refund = await razorpay.payments.refund(order.paymentResult.razorpay_payment_id, {
            amount: Math.round(order.totalPrice * 100), // Full refund
            notes: {
                reason: req.body.reason || 'Order cancelled',
            }
        });

        // Update order status
        order.status = 'Cancelled';
        order.isPaid = false;
        order.paymentResult.refund_id = refund.id;
        order.paymentResult.refund_status = refund.status;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOrderItems,
    verifyPayment,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    getRazorpayKey,
    handleWebhook,
    refundOrder
};
