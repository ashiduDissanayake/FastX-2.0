const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', userController.getUsers);            // GET /users - Get all users
router.get('/:id', userController.getUserById);      // GET /users/:id - Get user by ID
router.post('/', userController.createUser);         // POST /users - Create new user
router.put('/:id', userController.updateUser);       // PUT /users/:id - Update user by ID
router.delete('/:id', userController.deleteUser);    // DELETE /users/:id - Delete user by ID

module.exports = router;
