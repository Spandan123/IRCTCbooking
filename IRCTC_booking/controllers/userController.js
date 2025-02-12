const Train = require('../models/trainModel');
const Booking = require('../models/bookingModel');
const logger = require('../utils/logger');

const getTrainsByRoute = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.getTrainsByRoute(source, destination);
        logger.info(`Fetched trains for route: ${source} to ${destination}`);
        res.status(200).json(trains);
    } catch (err) {
        logger.error(`Error fetching trains: ${err.message}`);
        res.status(500).json({ message: 'Failed to fetch trains' });
    }
};

const bookSeat = async (req, res) => {
    try {
        const { trainId, seats } = req.body;
        const userId = req.user.id;

        // Check seat availability
        const train = await Train.getTrainsByRoute(trainId);
        if (train.available_seats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Book seats
        await Booking.createBooking(userId, trainId, seats);
        await Train.updateAvailableSeats(trainId, seats);

        logger.info(`Seats booked for user ID: ${userId} on train ID: ${trainId}`);
        res.status(201).json({ message: 'Seats booked successfully' });
    } catch (err) {
        logger.error(`Error booking seats: ${err.message}`);
        res.status(500).json({ message: 'Failed to book seats' });
    }
};

module.exports = { getTrainsByRoute, bookSeat };