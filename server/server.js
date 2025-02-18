const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');
const app = express();


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const sosRoutes = require('./routes/sosRoutes');
const resourceRoutes = require('./routes/resourcesRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatroomRoutes = require('./routes/chatroomRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/', agencyRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/contactus', contactRoutes);
app.use('/api/admin/contactus', contactRoutes);
app.use('/api/chatrooms', chatroomRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
