const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

router.post('/driverlogin', driverController.driverLogin);




module.exports = router;