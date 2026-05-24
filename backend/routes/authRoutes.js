const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

router.post('/signup', registerAdmin);
router.post('/artist-portal', loginAdmin);

module.exports = router;