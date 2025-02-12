const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

const log = (level, message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}\n`;

    // Append log message to the log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    // Also log to the console for development purposes
    console.log(logMessage.trim());
};

module.exports = {
    info: (message) => log('info', message),
    error: (message) => log('error', message),
};