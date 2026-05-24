const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const bookingRoutes = require('./routes/bookingRoutes'); 
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 🟢 SMART CORS LOGIC
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000', // Local Next.js
      process.env.FRONTEND_URL // Live Vercel Link (Hum baad mein .env mein dalenge)
    ];
    // Agar request valid origin se hai, ya fir postman/insomnia se hai (!origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy se blocked hai bhai!'));
    }
  },
  credentials: true // NextAuth aur cookies ke liye zaroori hai
};

app.use(cors(corsOptions));

// Badi images (Base64) allow karne ke liye
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Database se connect ho gaya!'))
  .catch((err) => console.log('❌ MongoDB Error: ', err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Route
app.post('/api/upload', async (req, res) => {
  try {
    const { image } = req.body; 
    const result = await cloudinary.uploader.upload(image, {
      folder: 'tattoo_samples' 
    });
    res.json({ success: true, secure_url: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Tattoo Artist API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server port ${PORT} par daud raha hai`);
});