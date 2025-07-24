const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  processor: String,
  ram: String,
  os: String,
  storage: String,
  display: String,
  rating: Number,
  no_of_ratings: Number,
  no_of_reviews: Number,
  img_link: String,
  stock: {
    type: Number,
    default: 50
  }
});

module.exports = mongoose.model('Product', productSchema);
