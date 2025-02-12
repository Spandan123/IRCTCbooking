const db = require('../config/db');
const logger = require('../utils/logger');

class User {
    static async createUser(name, email, password, role = 'user') {
        try {
            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, password, role]
            );
            logger.info(`User created: ${email}`);
            return result;
        } catch (err) {
            logger.error(`Error creating user: ${err.message}`);
            throw new Error('Failed to create user');
        }
    }

    static async findUserByEmail(email) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (err) {
            logger.error(`Error finding user by email: ${err.message}`);
            throw new Error('Failed to find user');
        }
    }
}

module.exports = User;