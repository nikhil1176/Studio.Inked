// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();

// 🟢 NAYA: Guard import kiya
const protectAdminRoute = require('../middleware/authMiddleware');

const { createBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');

// CREATE: Nayi booking add karna 
// (PUBLIC ROUTE: Yahan guard NAHI lagayenge taki customers form submit kar sakein)
router.post('/', createBooking);

// READ: Saari bookings dekhna 
// (PROTECTED ROUTE: Guard laga diya)
router.get('/', protectAdminRoute, getAllBookings);

// UPDATE: Kisi specific booking (id) ka status change karna 
// (PROTECTED ROUTE: Guard laga diya)
router.put('/:id/status', protectAdminRoute, updateBookingStatus);

module.exports = router;