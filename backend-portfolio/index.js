// index.js (or server.js)

// 1. Load environment variables FIRST
require('dotenv').config();

// 2. Import necessary modules
const express = require('express');
const cors = require('cors'); // Make sure cors is installed: npm install cors
const session = require('express-session');
const connectDB = require('./db');

// --- Route Imports ---
const skillsRoutes = require('./components/skills/routes.js'); // Adjust path if needed
const projectsRoutes = require('./components/projects/routes.js'); // Adjust path if needed
const experienceRoutes = require('./components/experience/routes.js'); // Adjust path if needed
const adminRoutes = require('./components/admin/routes.js'); // Adjust path if needed
 //const portfolioInfoRoutes = require('./components/portfolioInfo/routes');

// 3. Connect to Database
connectDB();

// 4. Initialize Express App
const app = express();

// --- Middleware Setup ---

// CORS Configuration using Environment Variables
const allowedOrigins = [];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
    console.log(`CORS: Allowing production origin: ${process.env.FRONTEND_URL}`);
}
// Always allow local development URLs
const devUrl = process.env.FRONTEND_DEV_URL || 'http://localhost:5173'; // Default Vite port
allowedOrigins.push(devUrl);
allowedOrigins.push(devUrl.replace('localhost', '127.0.0.1')); // Allow loopback explicitly
console.log(`CORS: Allowing development origins: ${devUrl}, ${devUrl.replace('localhost', '127.0.0.1')}`);


const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) OR
    // allow requests from specified origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow
    } else {
      console.warn(`CORS: Blocked origin: ${origin}`); // Log blocked attempts
      callback(new Error('Not allowed by CORS')); // Block
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow common methods
  credentials: true, // Allow cookies/session to be sent (adjust if not needed)
  optionsSuccessStatus: 200 // For compatibility
};

app.use(cors(corsOptions)); // Apply the CORS options

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.error("FATAL ERROR: SESSION_SECRET is not defined in .env file.");
    process.exit(1);
}
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      // sameSite: 'lax' // 'lax' is often a good default
      // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Use 'none' with secure:true for cross-site cookies if needed
      maxAge: 1000 * 60 * 60 * 24 // Example: 1 day session
  }
}));
// Important: If using sameSite: 'none', secure MUST be true (requires HTTPS)

// Trust proxy if running behind one (like Render, Heroku, Nginx) - needed for secure cookies
if (process.env.NODE_ENV === 'production') {
     app.set('trust proxy', 1); // trust first proxy
}


// --- Mount Routes ---
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API is ready!' });
});
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/admin', adminRoutes);
//app.use('/api/portfolio-info', portfolioInfoRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running!');
});

// --- Centralized Error Handling ---
app.use((err, req, res, next) => {
    console.error("Unhandled application error:", err.message);
    console.error(err.stack); // Log stack trace for debugging
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // error: process.env.NODE_ENV === 'development' ? err.stack : undefined // Only show stack in dev
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// --- Optional: Handle Unhandled Promise Rejections ---
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Consider exiting gracefully in production after logging
  // process.exit(1);
});
