const db = require('../config/db');

// User model
const User = {
  // Find all users
  findAll: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find user by ID
  findById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },

  // Create new user
  create: (userData, callback) => {
    const query = 'INSERT INTO users SET ?';
    db.query(query, userData, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Update user
  update: (id, userData, callback) => {
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [userData, id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete user
  delete: (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = User;
