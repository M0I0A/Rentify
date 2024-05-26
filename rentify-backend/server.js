const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rentify', { useNewUrlParser: true, useUnifiedTopology: true });

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.listen(5001, () => {
    console.log('Server is running on port 5001');
  });
  
