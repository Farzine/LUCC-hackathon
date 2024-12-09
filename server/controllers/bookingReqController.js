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
  
        // Create a notification message
        const notificationMessage = 'Meeting request updated';
  
        // Insert a new notification into the user_notification table
        const insertNotificationQuery = `
          INSERT INTO user_notification (user_id, message, status) 
          VALUES (?, ?, 'unread')
        `;
  
        // Assuming the notification is being sent to the user who made the booking request
        db.query(insertNotificationQuery, [userId, notificationMessage], (err, notificationResult) => {
          if (err) {
            return res.status(500).json({ message: 'Error inserting notification', error: err });
          }
  
          // Return a success response after the status is updated and notification is created
          res.status(200).json({
            message: `Booking request status updated to ${newStatus}`,
            bookingRequest: {
              request_id: requestId,
              status: newStatus,
            },
            notification: {
              notification_id: notificationResult.insertId,  // The ID of the inserted notification
              message: notificationMessage,
              status: 'unread',
            }
          });
        });
      });
    });
};



  // Function to fetch booking details from the database
exports.getBookingDetails =(req, res) => { // Get the user ID from the authenticated user
    const { userId, slotId } = req.body; 
    return new Promise((resolve, reject) => {
      const query = `
        SELECT booking_id, role 
        FROM booking 
        WHERE user_id = ? AND slot_id = ?
      `;
      
      // Execute the query
      db.query(query, [userId, slotId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Assuming only one result is expected
        }
      });
    });
  }
  


