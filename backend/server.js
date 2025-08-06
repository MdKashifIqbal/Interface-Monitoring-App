require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Choose the port from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
