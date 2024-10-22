const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware')


// User routes
router.post('/signup', userController.createUser);         // POST /user/signup - sign up the user
router.post('/login', userController.loginUser);       // POST /user/login - login the user
router.post('/logout', authenticateToken, userController.logoutUser);      // GET /user/logout - logout the user
router.get('/check-auth', userController.checkAuth);    // GET /user/check-auth - check if the user is authenticated 

// Product routes
router.get('/getallproducts', userController.getAllProducts); // GET /user/getallproducts - get all products
router.post('/postproduct', userController.postProduct); // POST /user/postproduct - post a product
router.get('/getproduct/:id', userController.getProductById); // GET /user/getproduct/:id - get a product by id
router.delete('/deleteproduct/:id', userController.deleteProduct); // DELETE /user/deleteproduct/:id - delete a product by id
router.put('/updateproduct/:id', userController.updateProduct); // PUT /user/updateproduct/:id - update a product by id
router.get('/getcategoryproducts', userController.getcategoryProducts);
router.get('/products/:criteria', productController.getProducts);

// Accesing Cart Routes
router.get('/getcart', authenticateToken, cartController.getCart);
router.post('/addtocart', authenticateToken, cartController.addToCart); // POST /user/addtocart - add product to cart
router.delete('/removecart', authenticateToken, cartController.removeFromCart); // DELETE /user/removecart - remove product from cart
router.put('/updatecart', authenticateToken, cartController.updateProductInCart); // PUT /user/updatecart - update product in cart
router.put('/updatecartstatus', authenticateToken, cartController.updateCartStatus);
router.get('/stores', cartController.getStores);
router.get('/end-locations/:store', cartController.getEndLocations);
router.get('/route-image', cartController.getRouteImage);

// Profile Section Routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.get('/orders', authenticateToken, userController.getOrders);

// Order Placement Routes
router.post('/payment', authenticateToken, userController.payment);
router.post('/placeorder', authenticateToken, userController.placeOrder);

module.exports = router;
