const jwt = require('jsonwebtoken'); // Ensure you have imported jwt
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

const JWT_SECRET = process.env.SECRET3; // Load secret from environment variables or config

const MainManagerAuthenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Ensure your cookies middleware is enabled
    if (!token) {
        return res.status(403).json({ error: 'Token required' }); // Return JSON instead of text
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' }); // Better error handling
        }
        req.user = user; // Attach user details to request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = MainManagerAuthenticateToken;
