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
router.post('/getorder/:storeId', mainmanagerController.getselectorder);
router.get('/gettrainschedule', mainmanagerController.getTrainSchedule);  
router.get('/getTrainCapacity/:storeId', mainmanagerController.getTrainCapacity);   
// router.put("/updateTrainSchedule", mainmanagerController.updateTrainSchedule);
router.put('/updateTrainSchedule', mainmanagerController.updateTrainSchedule);
router.put('/updateOrderStatus/:orderId', mainmanagerController.updateOrderStatus);
router.post('/mainmanagerlogin', mainmanagerController.mainManagerLogin);

router.get('/orders', mainmanagerController.getPendingOrders);

// Route to update the order status
router.put('/orders/:id', mainmanagerController.updateOrderStatus);
// router.get('//:storeId', mainmanagerController.getDriver);
module.exports = router;



