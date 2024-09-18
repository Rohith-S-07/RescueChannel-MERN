const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the connectDB function
const fs = require('fs');
const path = require('path');
const app = express();


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config();

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};



app.use(cors(corsOptions));
app.use(express.json());

// Your routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
