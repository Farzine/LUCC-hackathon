const express = require('express');
const GuestController = require('../controllers/GuestController');

const router = express.Router();

// Route to get guest details by slot_id
router.get('/guests/:slotId', GuestController.getGuestsBySlotId);

module.exports = router;
