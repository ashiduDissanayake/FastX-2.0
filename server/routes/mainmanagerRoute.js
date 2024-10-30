const express = require('express');
const router = express.Router();
const mainmanagerController = require('../controllers/mainmanagerController');
const MainManagerAuthenticateToken = require('../middlewares/MainmanagerauthMiddleware');

// User routes
router.post('/mainmanagerlogin', mainmanagerController.mainManagerLogin);
router.get('/check-auth', mainmanagerController.checkAuth)
router.post('/logout', mainmanagerController.logout)

router.get('/getdriver/:storeId',MainManagerAuthenticateToken, mainmanagerController.getDriver);         
router.get('/getdriverassistant/:storeId',MainManagerAuthenticateToken, mainmanagerController.getDriverAssistant);      
router.get('/gettruck/:storeId',MainManagerAuthenticateToken, mainmanagerController.getTruck);     
router.get('/getorder',MainManagerAuthenticateToken, mainmanagerController.getorder);     
router.get('/getroute/:storeId',MainManagerAuthenticateToken, mainmanagerController.getRoute);   
router.get('/getscheduletrip',MainManagerAuthenticateToken, mainmanagerController.getScheduleTrip);  
router.post('/scheduletrip',MainManagerAuthenticateToken, mainmanagerController.scheduleTrip);  
router.post('/getorder/:storeId',MainManagerAuthenticateToken, mainmanagerController.getselectorder);
router.get('/gettrainschedule',MainManagerAuthenticateToken, mainmanagerController.getTrainSchedule);  
router.get('/getTrainCapacity/:storeId',MainManagerAuthenticateToken, mainmanagerController.getTrainCapacity);   
// router.put("/updateTrainSchedule", mainmanagerController.updateTrainSchedule);
router.put('/updateTrainSchedule',MainManagerAuthenticateToken, mainmanagerController.updateTrainSchedule);
router.put('/updateOrderStatus/:orderId',MainManagerAuthenticateToken, mainmanagerController.updateOrderStatus);
router.get('/profile', MainManagerAuthenticateToken, mainmanagerController.getMainManagerDetails);


router.get('/Store1/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore1);
router.get('/Store2/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore2);
router.get('/Store3/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore3);
router.get('/Store4/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore4);
router.get('/Store5/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore5);
router.get('/Store6/orders',MainManagerAuthenticateToken, mainmanagerController.getPendingOrdersStore6);
router.get('/train/nearest-capacity/:storeId',MainManagerAuthenticateToken, mainmanagerController.getNearestCapacity);
router.put('/train/reduce-capacity/:storeId',MainManagerAuthenticateToken, mainmanagerController.reduceCapacity); 
router.get("/products/most-sold",MainManagerAuthenticateToken, mainmanagerController.getMostSoldProducts);
router.get('/sales-data',MainManagerAuthenticateToken, mainmanagerController.getSalesData);
router.get('/top-customers/:storeId',MainManagerAuthenticateToken, mainmanagerController.getTopCustomers);


router.get('/route-revenue',MainManagerAuthenticateToken, mainmanagerController.getRouteRevenue);

// Route to update the order status
router.put('/orders/:id', MainManagerAuthenticateToken, mainmanagerController.updateOrderStatus);


// router.get('//:storeId', mainmanagerController.getDriver);
module.exports = router;



