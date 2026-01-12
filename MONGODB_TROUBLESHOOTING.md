# Quick MongoDB Connection Troubleshooting

## Current Issue
You're experiencing a TLS/SSL connection error when trying to connect to MongoDB Atlas.

## Possible Solutions

### 1. Update Connection String (Try this first!)

Your current connection string uses URL-encoded password `%4012345678`. Try updating your `.env` file with:

```env
# Option 1: Use standard connection string without special encoding
MONGODB_URI=mongodb+srv://admin123:12345678@preque.gov1hdl.mongodb.net/preque?retryWrites=true&w=majority

# Option 2: Add TLS options
MONGODB_URI=mongodb+srv://admin123:12345678@preque.gov1hdl.mongodb.net/preque?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true
```

**Note:** If your password is actually `@12345678` (with @ symbol), keep the URL encoding as `%4012345678`

### 2. Check IP Whitelist

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click on "Network Access" in the left sidebar
3. Make sure either:
   - Your current IP is whitelisted, OR
   - You have `0.0.0.0/0` for "Allow Access from Anywhere" (development only!)

### 3. Verify Credentials

1. Go to MongoDB Atlas → Database Access
2. Verify user `admin123` exists and has correct password
3. Make sure user has "Read and write to any database" permissions

### 4. Check Cluster Status

1. Go to MongoDB Atlas → Database
2. Make sure your cluster (preque.gov1hdl) is active and running
3. Status should show green/active

### 5. Alternative: Use MongoDB Compass to Test

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Use the same connection string to test
3. If Compass can't connect, the issue is with MongoDB Atlas setup

### 6. Check Node.js Version

Some TLS issues occur with older Node.js versions:
```bash
node --version
```
Should be Node.js 16+ for best compatibility

### 7. Temporary Development Solution

For development only, you can let the app use the in-memory database:

```env
# Comment out or remove MONGODB_URI to use in-memory database
# MONGODB_URI=mongodb+srv://admin123:12345678@preque.gov1hdl.mongodb.net/preque
```

Then restart server and run seeder. Data will be temporary but lets you develop.

## Quick Test Commands

Test MongoDB connection directly:
```bash
cd server
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin123:12345678@preque.gov1hdl.mongodb.net/preque').then(() => console.log('✅ Connected!')).catch(err => console.error('❌ Error:', err.message));"
```

## Most Likely Fix

Try this updated `.env` configuration:

```env
PORT=5000
MONGODB_URI=mongodb+srv://admin123:12345678@preque.gov1hdl.mongodb.net/preque?retryWrites=true&w=majority
JWT_SECRET=preque_secret_12345
RAZORPAY_KEY_ID=placeholder_key_id
RAZORPAY_KEY_SECRET=placeholder_key_secret
RAZORPAY_WEBHOOK_SECRET=placeholder_webhook_secret
CLOUDINARY_CLOUD_NAME=placeholder_cloud_name
CLOUDINARY_API_KEY=placeholder_api_key
CLOUDINARY_API_SECRET=placeholder_api_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

The issue might be the `?appName=Preque` parameter. The standard connection string works better in most cases.
