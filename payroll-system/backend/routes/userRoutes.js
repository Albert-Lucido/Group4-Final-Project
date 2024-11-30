const express = require('express');
const User = require('../models/user'); // Ensure this points to your user model
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  const { personnelId, role, password } = req.body;
  const user = new User({ personnelId, role, password });
  if (!personnelId || !role || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
      const savedUser  = await user.save();
      res.status(201).json(savedUser );
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Optional: Add a DELETE route to remove users
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User  not found');
    res.json({ message: 'User  deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;