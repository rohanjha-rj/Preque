const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * Connect to MongoDB with retry logic and fallback options
 * @returns {Promise<boolean>} - Returns true if using memory server, false if using Atlas
 */
const connectDB = async (retries = 5) => {
    const uri = process.env.MONGODB_URI;
    const isDevelopment = process.env.NODE_ENV !== 'production';

    // MongoDB connection options for optimal performance and reliability
    const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };

    // Check if URI is properly configured
    if (!uri || uri.includes('placeholder') || uri.includes('your_mongodb')) {
        if (isDevelopment) {
            console.log('⚠️  No valid MongoDB URI found in .env file');
            console.log('📝 Starting in-memory database for development...');
            return await startMemoryServer();
        } else {
            console.error('❌ MongoDB URI is required in production mode!');
            console.error('📋 Please check MONGODB_SETUP.md for setup instructions');
            process.exit(1);
        }
    }

    // Attempt to connect with retry logic
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`🔄 Attempting to connect to MongoDB (Attempt ${attempt}/${retries})...`);
            const conn = await mongoose.connect(uri, options);

            console.log('✅ MongoDB Connected Successfully!');
            console.log(`📊 Database Host: ${conn.connection.host}`);
            console.log(`📦 Database Name: ${conn.connection.name}`);

            // Set up connection event handlers
            setupConnectionHandlers();

            return false; // Indicates real server is used
        } catch (error) {
            console.error(`❌ Connection attempt ${attempt} failed: ${error.message}`);

            if (attempt === retries) {
                // All retries exhausted
                if (isDevelopment) {
                    console.log('⚠️  All connection attempts failed. Falling back to in-memory database...');
                    return await startMemoryServer();
                } else {
                    console.error('❌ Fatal: Could not connect to MongoDB after all retries');
                    console.error('📋 Please check:');
                    console.error('   1. Your MongoDB Atlas connection string in .env');
                    console.error('   2. Your IP address is whitelisted in MongoDB Atlas');
                    console.error('   3. Your database user credentials are correct');
                    console.error('   4. Your network connection is stable');
                    process.exit(1);
                }
            }

            // Wait before retrying (exponential backoff)
            const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`⏳ Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
};

/**
 * Start MongoDB Memory Server for development
 */
const startMemoryServer = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        const memoryUri = mongoServer.getUri();
        await mongoose.connect(memoryUri);
        console.log('✅ MongoDB Memory Server Connected');
        console.log('⚠️  Note: Data will be lost when server restarts');
        return true;
    } catch (error) {
        console.error('❌ Failed to start MongoDB Memory Server:', error.message);
        process.exit(1);
    }
};

/**
 * Set up MongoDB connection event handlers
 */
const setupConnectionHandlers = () => {
    mongoose.connection.on('connected', () => {
        console.log('📡 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('📴 Mongoose disconnected from MongoDB');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('👋 Mongoose connection closed due to application termination');
        process.exit(0);
    });
};

module.exports = connectDB;
