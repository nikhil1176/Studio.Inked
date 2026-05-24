const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// 1. Manual Signup Logic
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "USER ALREADY EXISTS!!!" });
    }

    // Password ko secure (hash) karna
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya admin save karna
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin account successfully ban gaya!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// 2. Manual Login Logic
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin dhoondna
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Koi account nahi mila. Pehle signup karein." });
    }

    // Agar kisi ne Google se account banaya tha aur ab manual login try kar raha hai
    if (!admin.password) {
      return res.status(400).json({ success: false, message: "Kripya Google ke zariye Login karein." });
    }

    // Password check karna
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Galat password!" });
    }

    // Password chhodkar baaki data bhej do
    res.status(200).json({ 
      success: true, 
      data: { id: admin._id, name: admin.name, email: admin.email } 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };