const User = require('../models/userModel');

// Controller to handle requests
const userController = {
  
  // Get all users
  getUsers: (req, res) => {
    User.findAll((err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(users);
    });
  },

  // Get user by ID
  getUserById: (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    });
  },

  // Create new user
  createUser: (req, res) => {
    const newUser = req.body;
    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User created', userId: result.insertId });
    });
  },

  // Update user
  updateUser: (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    User.update(userId, updatedData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'User updated' });
    });
  },

  // Delete user
  deleteUser: (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'User deleted' });
    });
  }
};

module.exports = userController;
