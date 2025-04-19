require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Ultimate CORS Configuration
const allowedOrigins = [
  'https://portfolio-frontend-beta-seven.vercel.app',
  'https://portfolio-frontend-mey4.vercel.app',
  'http://localhost:3000'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.sendStatus(200);
});

// Your routes
app.post('/api/contact', (req, res) => {
  // Your contact form handling logic
  res.json({ success: true, message: "Message received!" });
});

// ... rest of your backend code

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));