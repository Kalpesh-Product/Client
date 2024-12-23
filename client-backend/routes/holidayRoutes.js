const express = require("express");

const router = express.Router();

const {
    holidayConfig
 } = require('../controllers/holidayControllers/holidayController');

 

router.post('/', holidayConfig);

module.exports = router;




