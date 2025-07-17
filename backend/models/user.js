// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  age: Number,
  country: String,
  address: {type: String, required: true},
  gender: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
