const db = require('../config/db');

const Booking = {};

// Fetch booking details where the user is a host
Booking.getHostBookings = (hostId, callback) => {
  const query = `
    SELECT 
      br.request_id, 
      br.status AS request_status, 
      u.name AS user_name, 
      u.user_pic_url AS profile_picture, 
      u.email AS email
    FROM booking_request br
    JOIN slots s ON br.slot_id = s.slot_id
    JOIN users u ON br.user_id = u.user_id
    WHERE s.user_id = ?
  `;

  db.query(query, [hostId], callback);
};

// Update the booking request status
Booking.updateRequestStatus = (requestId, newStatus, callback) => {
  const query = `
    UPDATE booking_request 
    SET status = ?
    WHERE request_id = ?
  `;

  db.query(query, [newStatus, requestId], callback);
};

module.exports = Booking;
