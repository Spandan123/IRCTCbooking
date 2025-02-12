const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(name, email, hashedPassword);
        logger.info(`User registered: ${email}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        logger.error(`Error registering user: ${err.message}`);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User logged in: ${email}`);
        res.status(200).json({ token });
    } catch (err) {
        logger.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ message: 'Failed to log in' });
    }
};

module.exports = { registerUser, loginUser };