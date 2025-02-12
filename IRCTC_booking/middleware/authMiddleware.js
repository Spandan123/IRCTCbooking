const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');  //  Get token from request headers

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });  // No token found
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);  //  Remove 'Bearer ' prefix if present
        req.user = decoded;  //  Attach decoded user to the request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
