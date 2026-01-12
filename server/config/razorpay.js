const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn('⚠️  Razorpay credentials not configured!');
    console.warn('📋 To enable payments:');
    console.warn('   1. Sign up at https://razorpay.com/');
    console.warn('   2. Get your API keys from the dashboard');
    console.warn('   3. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
    console.warn('   4. See RAZORPAY_INTEGRATION.md for detailed setup instructions');
}

// Check for placeholder values
if (process.env.RAZORPAY_KEY_ID?.includes('placeholder') ||
    process.env.RAZORPAY_KEY_SECRET?.includes('placeholder')) {
    console.warn('⚠️  Razorpay keys are still set to placeholder values!');
    console.warn('📋 Please update them with your actual Razorpay API keys');
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
});

module.exports = razorpay;

