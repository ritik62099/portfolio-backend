require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// ✅ CORS config
app.use(cors({
  origin: ["https://portfolio-frontend-beta-seven.vercel.app"],  // your frontend domain
  methods: ["POST", "GET"],
  credentials: true,
}));

// ✅ Manual headers for preflight fix


// Body parser
app.use(express.json());

// Routes
app.use("/api", contactRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({ message: "app is running" });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


module.exports = app;
