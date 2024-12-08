const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');


exports.makeBookingRequest = (req, res) => {
    const userId = req.user.user_id;

    const bookingReqId = uuidv4();
    const { slotId } = req.body;

    const query = 'INSERT INTO booking_request (booking_id, slot_id, user_id) VALUES (?, ?,?)';

    db.query(query, [bookingReqId, slotId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating booking request', error: err });
        }

        // Return a success response
        res.status(200).json({
            message: 'Booking request created successfully',
            bookingRequest: {
                booking_req_id: bookingReqId,
                slot_id: slotId,
                user_id: userId,
                status: 'pending',
            }
        });

    });
}

