const express = require('express');
const productController = require('../controllers/cartController');
const router = express.Router();

router.post('/cart/add', productController.postProduct);
router.get('/cart/get', productController.getAllProducts);
router.delete('/cart/remove', productController.deleteProduct);
router.put('/cart/update', productController.updateProduct);
// router.post('/cart/buy', productController.buyProducts);

module.exports = router;