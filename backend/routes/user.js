const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
  try {
    const {uid, email} = req.body;
    const existingUser = await User.findOne({uid});
    if(existingUser){
      return res.status(400).json({message: "User already exists."});
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('user data storing error', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});


// ➕ Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📤 Get a single user by ID
router.get('/:uid', async (req, res) => {
  try {
    const {uid} = req.params;
    console.log(uid);
    const user = await User.findOne({uid});
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
