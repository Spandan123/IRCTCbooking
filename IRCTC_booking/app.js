const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./middleware/authMiddleware'); // JWT Auth Middleware
const authenticateAdmin = require('./middleware/adminMiddleware'); // API Key Auth Middleware

dotenv.config();
const app = express();
app.use(express.json());

//  Protecting the home route with authentication
app.get('/', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, to the Railway Management API!` });
});

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Admin routes (protected by API key)
app.use('/api/admin', authenticateAdmin, adminRoutes);

// User routes (protected by JWT token)
app.use('/api/user', authenticate, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
