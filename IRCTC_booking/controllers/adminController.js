const Train = require('../models/trainModel');
const logger = require('../utils/logger');

const addTrain = async (req, res) => {
    try {
        const { name, source, destination, total_seats } = req.body;
        await Train.createTrain(name, source, destination, total_seats);
        logger.info(`Train added: ${name}`);
        res.status(201).json({ message: 'Train added successfully' });
    } catch (err) {
        logger.error(`Error adding train: ${err.message}`);
        res.status(500).json({ message: 'Failed to add train' });
    }
};

module.exports = { addTrain };