const dotenv = require('dotenv');
dotenv.config();

const authenticateAdmin = (req, res, next) => {
    try {
        // Get the API key from the X-API-KEY header
        const apiKey = req.header('X-API-KEY');
        if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
            console.error('Access denied. Invalid API key.');
            return res.status(403).json({ message: 'Access denied. Invalid API key.' });
        }

        console.log('Admin access granted');
        next();
    } catch (err) {
        console.error('Error authenticating admin:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = authenticateAdmin;