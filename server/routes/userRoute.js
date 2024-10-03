const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/signup', userController.createUser);         // POST /user/signup - sign up the user
router.post('/login', userController.loginUser);       // POST /user/login - login the user
router.post('/logout', userController.logoutUser);      // GET /user/logout - logout the user
router.get('/check-auth', userController.checkAuth);    // GET /user/check-auth - check if the user is authenticated 

module.exports = router;
