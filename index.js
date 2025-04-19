require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors());
app.use(cors({
  origin: [
    'https://portfolio-frontend-mey4.vercel.app',
    'http://localhost:3000' // For local testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.get('/',(req,res)=>{
  return res.status(200).json({ massage: "app is running" });
  
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
