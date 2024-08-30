const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the connectDB function

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow your React app's origin
  credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));


app.use(express.json());

// Your routes
const agencyRoutes = require('./routes/agencyRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/agencies', agencyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
