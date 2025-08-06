const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const interfaceRoutes = require('./routes/interfaceRoutes');
const logRoutes = require('./routes/logRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');  // Require error handler

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/interfaces', interfaceRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add error handler middleware last
app.use(errorHandler);

module.exports = app;
