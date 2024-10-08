const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// User routes
router.get('/getdriver/:storeId', managerController.getDriver);         
router.get('/getdriverassistant/:storeId', managerController.getDriverAssistant);      
router.get('/gettruck/:storeId', managerController.getTruck);     
router.get('/getstore', managerController.getStore);     
router.get('/getroute/:storeId', managerController.getRoute);   
router.get('/getscheduletrip', managerController.getScheduleTrip);  
router.get('/getstoreorders/:storeId', managerController.getStoreOrders);
// router.get('/gettrips/:storeId', managerController.getTripsByStore);

router.post('/scheduletrip', managerController.scheduleTrip);   

module.exports = router;
