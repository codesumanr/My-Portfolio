// db.js
const mongoose = require("mongoose");
// Remove dotenv configuration from here - it should be in index.js

// Get the URI from environment variables (loaded by index.js)
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => { // Renamed for clarity
    try {
        // 1. Check if MONGO_URI is loaded correctly
        if (!mongoURI) {
            console.error("FATAL ERROR: MONGO_URI is not defined in your .env file.");
            process.exit(1); // Exit application if DB connection string is missing
        }

        // 2. Check if already connected or connecting to prevent multiple attempts
        // (Mongoose readyStates: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)
        if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
             console.log("MongoDB is already connected or connecting.");
             return; // Already handled, exit function
        }

        console.log("Attempting to connect to MongoDB..."); // Log before connection attempt

        // 3. Connect using the correct variable and remove deprecated options
        await mongoose.connect(mongoURI, {
            // No useNewUrlParser or useUnifiedTopology needed for Mongoose 6+ / Driver 4+
            // You might add other options if necessary, e.g.:
            // serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });

        console.log("MongoDB Connected successfully.");

        // Optional: Listen for errors after initial connection
        mongoose.connection.on('error', err => {
            console.error('MongoDB runtime error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected.');
        });

    } catch (error) {
        // 4. Improved Error Handling - Exit on failure
        console.error("MongoDB Connection Failed:", error.message); // Show specific error
        // For more detail during debugging you might log the full error: console.error(error);
        process.exit(1); // Exit the application with an error code
    }
};

// 5. Export the function, don't call it here
module.exports = connectDB;