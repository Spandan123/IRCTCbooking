const db = require('../config/db');
const logger = require('../utils/logger');

class Booking {
    static async createBooking(userId, trainId, seatsBooked) {
        try {
            const [result] = await db.execute(
                'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
                [userId, trainId, seatsBooked]
            );
            logger.info(`Booking created for user ID: ${userId} on train ID: ${trainId}`);
            return result;
        } catch (err) {
            logger.error(`Error creating booking: ${err.message}`);
            throw new Error('Failed to create booking');
        }
    }

    static async getBookingDetails(bookingId) {
        try {
            const [rows] = await db.execute('SELECT * FROM bookings WHERE id = ?', [bookingId]);
            logger.info(`Fetched booking details for booking ID: ${bookingId}`);
            return rows[0];
        } catch (err) {
            logger.error(`Error fetching booking details: ${err.message}`);
            throw new Error('Failed to fetch booking details');
        }
    }
}

module.exports = Booking;