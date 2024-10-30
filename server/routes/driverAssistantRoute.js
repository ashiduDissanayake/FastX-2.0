const express = require('express');
const router = express.Router();
const driverAssistantAuthToken = require('../middlewares/DriverAssistantauthMiddleware');
const driverAssistantController = require('../controllers/driverAssistantController');

// Driver assistant routes
router.post("/driverassistantlogin", driverAssistantController.loginDriverAssistant); // POST /manager/login - login the manager
router.post("/logout", driverAssistantController.logoutDriverAssistant); // GET /manager/logout - logout the manager
router.get("/check-auth", driverAssistantController.checkAuth); // GET /manager/check-auth - check if the manager is authenticated

router.get ("/working-hours", driverAssistantAuthToken, driverAssistantController.getWorkingHours); // GET /driverassistant/working-hours - get the working hours of the driver assistant
router.get ("/getordersbytruckschedule", driverAssistantAuthToken, driverAssistantController.getordersbytruckschedule); 
router.patch("/updateorders/:order_id", driverAssistantAuthToken, driverAssistantController.updateOrderStatus);



module.exports = router;
