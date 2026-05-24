const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tattooStyle: {
    type: String,
    // e.g., "Minimalist", "Portrait", "Tribal", "Custom"
  },
  placement: {
    type: String,
    required: true,
    // e.g., "Left Forearm", "Back", "Neck"
  },
  size: {
    type: String,
    required: true,
    // e.g., "2x2 inches", "Full Sleeve"
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  referenceImage: {
    type: String,
    // Yahan Cloudinary ka image URL aayega jab client photo upload karega
  },
  description: {
    type: String,
    // Client ki tattoo idea, colors, meaning, specific elements
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
    // Artist isko baad mein admin panel se update kar sakta hai
  }
}, {
  timestamps: true // Yeh automatically 'createdAt' aur 'updatedAt' time save kar lega
});

module.exports = mongoose.model('Booking', bookingSchema);