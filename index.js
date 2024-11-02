// toInvoke.js
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

exports.handler = async (event) => {
    try {
        // Check if event is already an object or needs parsing
        const input = typeof event === 'string' ? JSON.parse(event) : event;

        // Log received input for debugging
        console.log("Received input:", input);

        // Generate a UUID
        const uniqueId = uuid.v4();

        // Create JWT payload with UUID
        const payload = {
            ...input, // include original input data
            uuid: uniqueId
        };

        // Secret key for signing the JWT (should be securely managed)
        const secretKey = "6fe4917b0a1ba2453912bd5fb51fc8c35f5b85f5c53fb6d2b96015e5f8166796"; // Replace with your secure key

        // Generate JWT
        const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

        // Return the JWT as the encrypted message
        return {
            statusCode: 200,
            body: {
                jwt: token,
                uuid: uniqueId
            }
        };

    } catch (error) {
        console.error("Error in JWT Lambda function:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `JWT generation failed: ${error.message}` })
        };
    }
};
