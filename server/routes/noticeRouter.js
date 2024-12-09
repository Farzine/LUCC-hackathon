const express = require('express');
const {getNotice}= require('../controllers/noticeController')
const router = express.Router();

// GET /api/slots/search?hostName=John&status=available&startDate=2024-01-01&endDate=2024-01-31&startTimeFilter=09:00:00&endTimeFilter=17:00:00
router.get('/allnotice', getNotice);

module.exports = router;