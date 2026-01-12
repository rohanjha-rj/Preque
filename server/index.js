const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

// Validate critical environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
    console.error('📋 Please check your .env file');
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
}

// Connect to database
connectDB();

const app = express();

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development; configure properly in production
    crossOriginEmbedderPolicy: false
}));

// Request Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Detailed logging in development
} else {
    app.use(morgan('combined')); // Standard Apache combined format in production
}

// Rate Limiting - Prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Stricter rate limiting for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Only 5 requests per 15 minutes for auth
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true
});

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow any localhost origin for development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }

        // Check allowed origins from env
        const allowedOrigins = [process.env.CLIENT_URL];
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authLimiter, userRoutes); // Apply auth limiter to user routes
app.use('/api/orders', orderRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.json({
        message: 'Preque API is running...',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            products: '/api/products',
            users: '/api/users',
            orders: '/api/orders'
        }
    });
});

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'Connected'
    });
});

// Seeding Route (for development/in-memory DB)
app.post('/api/seed', async (req, res) => {
    try {
        const { importData } = require('./seeder');
        await importData(false); // false = don't exit process
        res.status(200).json({ message: 'Database seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Seeding failed', error: error.message });
    }
});


// Error Handlers (must be last)
app.use(notFound);
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('🚀 ════════════════════════════════════════════════');
    console.log(`   Preque API Server`);
    console.log('🚀 ════════════════════════════════════════════════');
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Server running on port ${PORT}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log('🚀 ════════════════════════════════════════════════');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    // Close server & exit process
    process.exit(1);
});

