const express = require('express');
const router = express.Router();
const railwaymanagerController = require('../controllers/railwaymanagerController');

router.get('/gettrainschedule', railwaymanagerController.getTrainSchedule); 
router.put('/updateTrainSchedule', railwaymanagerController.updateTrainSchedule);

module.exports = router;
