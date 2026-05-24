const Booking = require('../models/Booking');

// 1. Nayi booking create karna
const createBooking = async (req, res) => {
  try {
    const { clientName, phone, email, tattooStyle, placement, size, bookingDate, referenceImage } = req.body;
    const newBooking = new Booking({
      clientName, phone, email, tattooStyle, placement, size, bookingDate, referenceImage
    });
    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, message: 'Appointment request successfully submitted!', data: savedBooking });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// 2. Saari bookings lana (Admin Dashboard ke liye)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    res.status(500).json({ success: false, message: 'Bookings fetch error', error: error.message });
  }
};

// --- NAYA LOGIC: Booking ka Status Update Karna ---
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params; // URL se booking ki ID milegi
    const { status } = req.body; // Frontend se naya status aayega

    // Database me booking dhoond kar uska status update karna
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { status: status }, 
      { new: true } // Ye ensure karta hai ki updated data return ho
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking nahi mili" });
    }

    res.status(200).json({
      success: true,
      message: "Status successfully update ho gaya!",
      data: updatedBooking
    });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ success: false, message: "Status update fail ho gaya" });
  }
};
// --------------------------------------------------

// Teeno functions ko export karna
module.exports = { createBooking, getAllBookings, updateBookingStatus };