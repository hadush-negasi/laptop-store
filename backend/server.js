const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
require('dotenv').config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Backend server is running 🚀');
});
//console.log('Attempting to connect to:', process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
