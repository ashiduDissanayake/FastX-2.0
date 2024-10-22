const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware')
const adminController = require('../controllers/adminController');


// User routes
router.post('/signup', adminController.createUser);         // POST /user/signup - sign up the user
router.post('/login', adminController.loginUser);       // POST /user/login - login the user
router.post('/logout', adminController.logoutUser);      // GET /user/logout - logout the user
router.get('/check-auth', adminController.checkAuth);    // GET /user/check-auth - check if the user is authenticated 
    
