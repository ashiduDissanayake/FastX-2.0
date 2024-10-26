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

router.get('/Store1/orders', mainmanagerController.getPendingOrdersStore1);
router.get('/Store2/orders', mainmanagerController.getPendingOrdersStore2);
router.get('/Store3/orders', mainmanagerController.getPendingOrdersStore3);
router.get('/Store4/orders', mainmanagerController.getPendingOrdersStore4);
router.get('/Store5/orders', mainmanagerController.getPendingOrdersStore5);
router.get('/train/nearest-capacity/:storeId', mainmanagerController.getNearestCapacity);
router.put('/train/reduce-capacity/:storeId', mainmanagerController.reduceCapacity); 
router.get('/most-sold-items', mainmanagerController.getMostSoldItems);
router.get('/sales-data', mainmanagerController.getSalesData);

// Route to update the order status
router.put('/orders/:id', mainmanagerController.updateOrderStatus);


// router.get('//:storeId', mainmanagerController.getDriver);
module.exports = router;



