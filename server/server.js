// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000; // Default to port 5000 if not set

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
