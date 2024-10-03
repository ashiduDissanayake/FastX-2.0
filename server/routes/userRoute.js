const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/signup', userController.createUser);         // POST /user/signup - sign up the user
router.post('/login', userController.loginUser);       // POST /user/login - login the user
router.post('/logout', userController.logoutUser);      // GET /user/logout - logout the user
router.get('/check-auth', userController.checkAuth);    // GET /user/check-auth - check if the user is authenticated 

// Product routes
router.get('/getallproducts', userController.getAllProducts); // GET /user/getallproducts - get all products
router.post('/postproduct', userController.postProduct); // POST /user/postproduct - post a product
router.get('/getproduct/:id', userController.getProductById); // GET /user/getproduct/:id - get a product by id
router.delete('/deleteproduct/:id', userController.deleteProduct); // DELETE /user/deleteproduct/:id - delete a product by id
router.put('/updateproduct/:id', userController.updateProduct); // PUT /user/updateproduct/:id - update a product by id
module.exports = router;
