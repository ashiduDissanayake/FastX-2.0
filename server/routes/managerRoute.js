const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const managerAuthToken = require('../middlewares/ManagerauthMiddleware')

// Manager routes
router.post("/signup", managerController.createManager); // POST /manager/signup - sign up the manager
router.post("/managerlogin", managerController.loginManager); // POST /manager/login - login the manager
router.post("/logout", managerController.logoutManager); // GET /manager/logout - logout the manager
router.get("/check-auth", managerController.checkAuth); // GET /manager/check-auth - check if the manager is authenticated

router.get('/getdriver', managerAuthToken, managerController.getDriverByStore);         
router.get('/getdriverassistant',managerAuthToken, managerController.getDriverAssistant);      
router.get('/gettruck',managerAuthToken, managerController.getTruck);       
router.get('/getroute', managerAuthToken,managerController.getRoute);   
router.get('/getstoreorders',managerAuthToken, managerController.getStoreOrders);

router.get('/gettrainorders',managerAuthToken, managerController.getTrainOrdersByStore);
router.get('/getactivetrips',managerAuthToken, managerController.getActiveTripsByStore);
router.get('/getfinishedtrips',managerAuthToken, managerController.getFinishedTripsByStore);

router.post('/updatetobranch',managerAuthToken, managerController.updateOrdersToBranch);
router.post('/endtrip', managerController.endTrip);
router.post('/scheduletrip',managerAuthToken, managerController.scheduleTrip);   

module.exports = router;
