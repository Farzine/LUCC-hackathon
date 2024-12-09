const express = require('express');
const BookingController = require('../controllers/BookingController');

const router = express.Router();

// Route to get all booking requests for a host
router.get('/host/:hostId/bookings', BookingController.getHostBookings);

// Route to update booking request status
router.post('/booking-request/status', BookingController.updateRequestStatus);

module.exports = router;
