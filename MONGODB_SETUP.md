# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas (cloud database) for your Preque e-commerce application - **even if you're a complete beginner!**

## What is MongoDB Atlas?

MongoDB Atlas is a cloud-hosted database service that's:
- **Free** to start (with generous limits)
- **Easy** to set up (no installation needed)
- **Reliable** and scalable
- **Secure** with built-in authentication

## Step-by-Step Setup

### Step 1: Create a MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Complete the registration form

### Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"** or **"Create"**
2. Select the **FREE** tier (M0 Sandbox)
   - It's completely free forever
   - 512 MB storage (plenty for development)
3. Choose your cloud provider:
   - **AWS** is recommended
   - Select a region closest to you (e.g., Mumbai for India)
4. Give your cluster a name (e.g., "Preque-Cluster")
5. Click **"Create Cluster"**
   - This takes about 3-5 minutes ⏳

### Step 3: Create a Database User

While your cluster is being created:

1. Click on **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Set credentials:
   - **Username**: `preque_admin` (or any name you prefer)
   - **Password**: Click "Autogenerate Secure Password" or create your own
   - **⚠️ IMPORTANT**: Copy and save this password securely! You'll need it later.
5. Set **Database User Privileges** to **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist Your IP Address

MongoDB Atlas only allows connections from authorized IP addresses for security.

1. Click on **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. You have two options:
   - **For Development**: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
     - This allows connections from any IP
     - Easier for development, especially if your IP changes
   - **For Production**: Click **"Add Current IP Address"**
     - More secure
     - You'll need to add new IPs if you change networks
4. Click **"Confirm"**

### Step 5: Get Your Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** as the driver and latest version
5. Copy the connection string - it looks like this:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Configure Your Application

1. Open your `.env` file in the `server` folder
2. Replace the `MONGODB_URI` value with your connection string
3. **Important**: Replace `<username>` and `<password>` in the connection string:
   - `<username>`: Your database username (e.g., `preque_admin`)
   - `<password>`: The password you created (⚠️ **URL-encode special characters!**)
4. Add your database name after `.net/` - for example:
   ```
   MONGODB_URI=mongodb+srv://preque_admin:YourPassword123@cluster0.xxxxx.mongodb.net/preque?retryWrites=true&w=majority
   ```

### Step 7: Test Your Connection

1. Save your `.env` file
2. Start your server:
   ```bash
   cd server
   npm run dev
   ```
3. Look for the success message:
   ```
   ✅ MongoDB Connected Successfully!
   📊 Database Host: cluster0.xxxxx.mongodb.net
   📦 Database Name: preque
   ```

If you see this, **congratulations!** 🎉 Your database is connected!

## Troubleshooting

### Error: "Authentication failed"
- ❌ Wrong username or password
- ✅ **Fix**: Double-check your credentials in `.env`
- ✅ Make sure your password doesn't have special characters, or URL-encode them

### Error: "Connection timeout" or "Could not connect to any servers"
- ❌ Your IP address is not whitelisted
- ✅ **Fix**: Go to Network Access and add your IP or allow access from anywhere (0.0.0.0/0)

### Error: "Bad auth: Authentication failed"
- ❌ Special characters in password not URL-encoded
- ✅ **Fix**: If your password has special characters like `@`, `#`, `$`, etc., you need to URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - Or generate a new password without special characters

### Database name is missing
- ❌ Connection string doesn't specify database name
- ✅ **Fix**: Add `/preque` after `.mongodb.net` in your connection string

## Viewing Your Data

1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. You'll see your databases and collections here
4. After running the seeder script, you'll see:
   - `products` collection (with all your products)
   - `users` collection (with admin and test users)
   - `orders` collection (initially empty)

## Seeding Sample Data

Once your database is connected, load the sample products:

```bash
cd server
npm run data:import
```

This will:
- Clear existing data
- Add 30+ sample products
- Create an admin user (email: admin@preque.in, password: password123)

To clear all data:
```bash
npm run data:destroy
```

## Security Best Practices

> [!WARNING]
> **Never commit your `.env` file to Git!** It contains sensitive credentials.

✅ The `.env` file is already in `.gitignore`
✅ Use `.env.example` to share the structure without sensitive data
✅ In production, use environment variables or secrets management

## Need More Help?

- 📚 [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- 💬 [MongoDB Community Forums](https://www.mongodb.com/community/forums/)
- 📧 Contact MongoDB support from your Atlas dashboard

---

**You're all set!** 🚀 Your Preque e-commerce app is now connected to a professional cloud database.
