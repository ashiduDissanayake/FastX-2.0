const express = require('express');
const router = express.Router();
const mainmanagerController = require('../controllers/mainmanagerController');

// User routes
router.get('/getdriver/:storeId', mainmanagerController.getDriver);         
router.get('/getdriverassistant/:storeId', mainmanagerController.getDriverAssistant);      
router.get('/gettruck/:storeId', mainmanagerController.getTruck);     
router.get('/getorder', mainmanagerController.getorder);     
router.get('/getroute/:storeId', mainmanagerController.getRoute);   
router.get('/getscheduletrip', mainmanagerController.getScheduleTrip);  

router.post('/scheduletrip', mainmanagerController.scheduleTrip);   
router.post('/mainmanagerlogin', mainmanagerController.mainManagerLogin);

module.exports = router;