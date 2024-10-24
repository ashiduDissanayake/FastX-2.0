const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware')
const adminController = require('../controllers/adminController');


// User routes
// router.post('/signup', adminController.createUser);         // POST /user/signup - sign up the user
// router.post('/login', adminController.loginUser);       // POST /user/login - login the user
// router.post('/logout', adminController.logoutUser);      // GET /user/logout - logout the user
// router.get('/check-auth', adminController.checkAuth);
router.get('/get-customer',adminController.getCustomer );  // GET /user/check-auth - check if the user is authenticated 
router.get('/getallproducts', adminController.getAllProducts); // GET /user/getallproducts - get all products
router.post('/postproduct', adminController.postProduct); // POST /user/postproduct - post a product
router.put('/updateproduct/:id', adminController.updateProduct); // PUT /user/updateproduct/:id - update a product by id
router.delete('/deleteproduct/:id', adminController.deleteProduct); // DELETE /user/deleteproduct/:id - delete a product by id
router.get('/getdriver', adminController.getDriver);
router .get('/countcustomer', adminController.countCustomer);
router.get('/countproduct', adminController.countProduct);
router.get('/countEmployee', adminController.countEmployee);
                                                      
    
module.exports = router;