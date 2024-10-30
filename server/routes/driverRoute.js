const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const DriverauthenticateToken = require('../middlewares/DriverauthMiddleware');

router.post('/driverlogin', driverController.driverLogin);
router.post('/logout', driverController.logoutDriver);      // GET /user/logout - logout the user
router.get('/check-auth', driverController.checkAuth);    
router.get('/order-deliver', DriverauthenticateToken, driverController.getDriverorders);
router.patch('/deliver/:order_id',DriverauthenticateToken, driverController.deliverOrder);
router.get('/truck-schedules',DriverauthenticateToken, driverController.getAllSchedules);
router.get('/profile', DriverauthenticateToken, driverController.getDriverDetails);

module.exports = router;