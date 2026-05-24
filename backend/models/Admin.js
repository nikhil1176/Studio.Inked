const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Isko optional rakha hai kyunki Google Auth mein password nahi hota
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);