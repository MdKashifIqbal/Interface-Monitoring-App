// middleware/auth.js

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Check for token in header
  const authHeader = req.headers.header;
  console.log(authHeader.split(" ")[0]);
  if (!authHeader || authHeader.split(" ")[0] != "Bearer") {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
