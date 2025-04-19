require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 1. CORS Configuration (Essential for Vercel)
const allowedOrigins = [
  'https://portfolio-frontend-beta-seven.vercel.app',
  'http://localhost:3000' // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// 2. Apply CORS middleware
app.use(cors(corsOptions));

// 3. Handle preflight requests
app.options('*', cors(corsOptions));

// 4. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Routes
app.use('/api', contactRoutes);

// 6. Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Backend is running!',
    api: {
      contact: '/api/contact',
      docs: 'Coming soon'
    }
  });
});

// 7. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 8. Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

module.exports = app; // For Vercel deployment