const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');


exports.makeBookingRequest = (req, res) => {
  const userId = req.user.user_id;

  const bookingReqId = uuidv4();
  const { slotId } = req.body;

  const query = 'INSERT INTO booking_request (request_id, slot_id, user_id) VALUES (?, ?,?)';

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

exports.updateBookingRequestStatus = (req, res) => {
    const userId = req.user.user_id;  // Get the user ID from the authenticated user
    const { requestId, newStatus } = req.body;  // Extract requestId and newStatus from the request body
  
    // Validate that the newStatus is either 'accepted' or 'rejected'
    if (!['accepted', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status. It should be either "accepted" or "rejected".' });
    }
  
    // First, check if the user is a 'host' by querying the 'booking' table
    const checkHostQuery = 'SELECT * FROM booking WHERE user_id = ? AND role = "host"';
  
    db.query(checkHostQuery, [userId], (err, hostResult) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking user role', error: err });
      }
  
      if (hostResult.length === 0) {
        return res.status(403).json({ message: 'Only the host can update the booking request status.' });
      }
  
      // If the user is a host, proceed to update the booking request status
      const updateStatusQuery = 'UPDATE booking_request SET status = ? WHERE request_id = ?';
  
      db.query(updateStatusQuery, [newStatus, requestId], (err, updateResult) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating booking request status', error: err });
        }
  
        if (updateResult.affectedRows === 0) {
          return res.status(404).json({ message: 'Booking request not found.' });
        }
  
        // Return a success response after the status is updated
        res.status(200).json({
          message: `Booking request status updated to ${newStatus}`,
          bookingRequest: {
            request_id: requestId,
            status: newStatus,
          },
        });
      });
    });
  };



  exports.getBookingDetails = (req, res) => {
    const { userId, slotId } = req.body;
  
    if (!userId || !slotId) {
      return res.status(400).json({ message: "User ID and Slot ID are required." });
    }
  
    const query = `
      SELECT booking_id, role 
      FROM booking 
      WHERE user_id = ? AND slot_id = ?
    `;
  
    db.query(query, [userId, slotId], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Database query failed.", error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No booking found for the provided details." });
      }
  
      return res.status(200).json({ bookingDetails: results[0] });
    });
  };
  


