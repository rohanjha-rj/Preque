# Razorpay Payment Integration Guide

Complete guide to integrating Razorpay payments in your Preque e-commerce application.

## What is Razorpay?

Razorpay is India's leading payment gateway that allows you to accept:
- Credit/Debit Cards
- Net Banking
- UPI
- Wallets (Paytm, PhonePe, etc.)
- EMI options

## Step 1: Create a Razorpay Account

1. Visit [https://razorpay.com/](https://razorpay.com/)
2. Click **Sign Up** and create your account
3. Complete the KYC verification (required for live mode)
4. You'll have access to **Test Mode** immediately for development

## Step 2: Get Your API Keys

### Test Mode Keys (For Development)

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Make sure you're in **Test Mode** (toggle at the top)
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Key**
5. You'll see:
   - **Key ID**: `rzp_test_xxxxxxxxxx`
   - **Key Secret**: Click "Show" to reveal it
6. **⚠️ Important**: Copy and save both keys securely!

### Live Mode Keys (For Production)

1. Complete KYC verification
2. Switch to **Live Mode**
3. Go to **Settings** → **API Keys**
4. Click **Generate Live Key**
5. Follow the same process as test mode

## Step 3: Configure Your Application

1. Open your `.env` file in the `server` folder
2. Add your Razorpay credentials:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

> [!TIP]
> Use **Test Mode** keys during development. Switch to **Live Mode** keys only when ready for production.

## Step 4: Backend Integration (Already Done!)

The backend is already configured with:

✅ Order creation endpoint
✅ Payment verification endpoint
✅ Webhook handler for payment notifications
✅ Refund functionality

### Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/config/razorpay` | Get Razorpay Key ID for frontend |
| POST | `/api/orders` | Create order & Razorpay order |
| POST | `/api/orders/verify` | Verify payment signature |
| POST | `/api/orders/webhook` | Handle Razorpay webhooks |
| POST | `/api/orders/:id/refund` | Process refund (Admin only) |

## Step 5: Frontend Integration

### Install Razorpay Checkout Script

Add this script to your frontend's `index.html` or `layout.js`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Example: Create Order & Process Payment

```javascript
import axios from 'axios';

const handleRazorpayPayment = async (orderData) => {
  try {
    // 1. Create order in your backend
    const { data } = await axios.post('/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    const { order, razorpayOrder } = data;

    // 2. Get Razorpay Key ID
    const { data: config } = await axios.get('/api/orders/config/razorpay');

    // 3. Configure Razorpay options
    const options = {
      key: config.key,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Preque',
      description: 'Sustainable Fashion Purchase',
      order_id: razorpayOrder.id,
      handler: async function (response) {
        // 4. Verify payment on backend
        try {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id
          };

          const { data: verifiedOrder } = await axios.post(
            '/api/orders/verify',
            verifyData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }
          );

          // Payment successful!
          alert('Payment Successful!');
          window.location.href = `/order/${verifiedOrder._id}`;
        } catch (error) {
          alert('Payment verification failed!');
          console.error(error);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone || ''
      },
      theme: {
        color: '#2C5F2D' // Your brand color
      },
      modal: {
        ondismiss: function () {
          alert('Payment cancelled');
        }
      }
    };

    // 5. Open Razorpay checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment Error:', error);
    alert('Failed to initiate payment');
  }
};
```

### Next.js Example (using useEffect)

```javascript
'use client';
import { useEffect } from 'react';

export default function CheckoutPage() {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Use handleRazorpayPayment function here
  // ...
}
```

## Step 6: Test Your Integration

### Test Cards (Test Mode Only)

| Card Network | Card Number | CVV | Expiry |
|--------------|-------------|-----|--------|
| Mastercard | 5267 3181 8797 5449 | Any 3 digits | Any future date |
| Visa | 4111 1111 1111 1111 | Any 3 digits | Any future date |
| Rupay | 6074 0000 0000 0000 0000 | Any 3 digits | Any future date |

### Test UPI
- UPI ID: `success@razorpay`
- This will simulate a successful payment

### Test Wallet
- Use any phone number
- OTP: `112112` (in test mode)

## Step 7: Set Up Webhooks (Optional but Recommended)

Webhooks notify your server about payment events automatically.

1. Go to **Settings** → **Webhooks** in Razorpay Dashboard
2. Click **Create Webhook**
3. Enter your webhook URL:
   ```
   https://your-domain.com/api/orders/webhook
   ```
4. Select events to track:
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   - ✅ `order.paid`
   - ✅ `refund.created`
5. Copy the **Webhook Secret**
6. Add it to your `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
   ```

## Security Best Practices

> [!WARNING]
> **Never expose your Key Secret!**
> - Store it in `.env` file
> - Never commit it to Git
> - Never send it to frontend

> [!IMPORTANT]
> **Always verify payment signature** on the backend before marking orders as paid.

✅ **Do's:**
- Use HTTPS in production
- Verify webhook signatures
- Store keys in environment variables
- Use test mode during development
- Validate amount on backend

❌ **Don'ts:**
- Don't store keys in frontend code
- Don't skip signature verification
- Don't trust frontend data for payment confirmation
- Don't use live keys in development

## Troubleshooting

### Error: "Authentication Failed"
- ❌ Wrong API keys
- ✅ **Fix**: Double-check your `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`

### Error: "Invalid signature"
- ❌ Signature verification failed
- ✅ **Fix**: Ensure you're using the correct `RAZORPAY_KEY_SECRET` on backend

### Payment succeeds but order not updating
- ❌ Webhook not configured or failing
- ✅ **Fix**: Add webhook URL in Razorpay dashboard and verify webhook secret

### "Cannot read property 'Razorpay'"
- ❌ Razorpay checkout script not loaded
- ✅ **Fix**: Ensure script is loaded before calling payment function

## Going Live Checklist

- [ ] Complete KYC verification
- [ ] Generate Live API keys
- [ ] Update `.env` with live keys
- [ ] Test with real small amount
- [ ] Configure webhook with production URL
- [ ] Set up proper error logging
- [ ] Add payment receipt generation
- [ ] Configure refund policy

## Resources

- 📚 [Razorpay Documentation](https://razorpay.com/docs/)
- 🛠️ [Integration Guides](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- 💬 [Community Support](https://razorpay.com/support/)
- 📧 [Contact Support](https://dashboard.razorpay.com/support)

---

**Your Razorpay integration is ready!** 🎉 Start testing in test mode and go live when you're ready.
