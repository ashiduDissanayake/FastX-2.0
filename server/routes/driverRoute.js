const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const DriverauthenticateToken = require('../middlewares/DriverauthMiddleware');

router.post('/driverlogin', driverController.driverLogin);
router.get('/profile', DriverauthenticateToken, driverController.getDriverorders);
router.patch('/deliver/:order_id', driverController.deliverOrder);


module.exports = router;