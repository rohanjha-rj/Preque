const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    message: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Token has expired, please login again',
                    code: 'TOKEN_EXPIRED'
                });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: 'Invalid token, please login again',
                    code: 'INVALID_TOKEN'
                });
            } else {
                return res.status(401).json({
                    message: 'Not authorized, token failed',
                    code: 'AUTH_FAILED'
                });
            }
        }
    } else {
        return res.status(401).json({
            message: 'Not authorized, no token provided',
            code: 'NO_TOKEN'
        });
    }
};

/**
 * Admin middleware - Check if user is admin
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            message: 'Not authorized as an admin',
            code: 'NOT_ADMIN'
        });
    }
};

module.exports = { protect, admin };

