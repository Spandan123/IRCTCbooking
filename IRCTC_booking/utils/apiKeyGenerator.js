const crypto = require('crypto');

const generateApiKey = () => {
    try {
        // Generate a random 32-character hex string
        const apiKey = crypto.randomBytes(16).toString('hex');
        return apiKey;
    } catch (err) {
        console.error('Error generating API key:', err.message);
        throw new Error('Failed to generate API key');
    }
};

const apiKey = generateApiKey();
console.log('Generated API Key:', apiKey);


module.exports = generateApiKey;