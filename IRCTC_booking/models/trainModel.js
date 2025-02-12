const db = require('../config/db');
const logger = require('../utils/logger');

class Train {
    static async createTrain(name, source, destination, total_seats) {
        try {
            const [result] = await db.execute(
                'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
                [name, source, destination, total_seats, total_seats]
            );
            logger.info(`Train created: ${name}`);
            return result;
        } catch (err) {
            logger.error(`Error creating train: ${err.message}`);
            throw new Error('Failed to create train');
        }
    }

    static async getTrainsByRoute(source, destination) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM trains WHERE source = ? AND destination = ?',
                [source, destination]
            );
            logger.info(`Fetched trains for route: ${source} to ${destination}`);
            return rows;
        } catch (err) {
            logger.error(`Error fetching trains: ${err.message}`);
            throw new Error('Failed to fetch trains');
        }
    }

    static async updateAvailableSeats(trainId, seats) {
        try {
            await db.execute(
                'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
                [seats, trainId]
            );
            logger.info(`Updated available seats for train ID: ${trainId}`);
        } catch (err) {
            logger.error(`Error updating available seats: ${err.message}`);
            throw new Error('Failed to update seats');
        }
    }
}

module.exports = Train;