// backend/middleware/authMiddleware.js

const protectAdminRoute = (req, res, next) => {
  // Request header se key nikalna
  const apiKey = req.headers['x-api-key'];

  // Match karna ki kya key humare .env wali key se milti hai
  if (apiKey === process.env.ADMIN_SECRET_KEY) {
    next(); // Sab theek hai, aage badho (allow access)
  } else {
    res.status(401).json({ success: false, message: "Security Alert: Unauthorized API Access Denied!" });
  }
};

module.exports = protectAdminRoute;