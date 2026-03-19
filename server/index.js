const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const packagesRoutes = require('./routes/packages');
const enquiriesRoutes = require('./routes/enquiries');
const contactRoutes = require('./routes/contact');
const packageEnquiriesRoutes = require('./routes/packageEnquiries');
const uploadRoutes = require('./routes/upload');
const trendingDestinationsRoutes = require('./routes/trendingDestinations');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/package-enquiries', packageEnquiriesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/trending-destinations', trendingDestinationsRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Travel API is running.' }));

app.listen(PORT, () => {
  console.log(`✅ Travel API server running at http://localhost:${PORT}`);
  console.log(`   MySQL DB: ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});
