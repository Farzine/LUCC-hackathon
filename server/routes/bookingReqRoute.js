const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { makeBookingRequest, updateBookingRequestStatus } = require('../controllers/bookingReqController');

const bookingRouter = express.Router();

// GET /api/slots/search?hostName=John&status=available&startDate=2024-01-01&endDate=2024-01-31&startTimeFilter=09:00:00&endTimeFilter=17:00:00
bookingRouter.post('/book',protect, makeBookingRequest);
bookingRouter.put('/updatebooking', protect, updateBookingRequestStatus)


module.exports = bookingRouter;