require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://portfolio-frontend-beta-seven.vercel.app', // Your actual frontend URL
    'https://portfolio-frontend-mey4.vercel.app', // Your backend URL
    'http://localhost:3000' // For local testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.get('/', (req, res) => {
  return res.status(200).json({ message: "app is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});