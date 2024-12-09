const Booking = require('../models/Booking');

// Get booking details for the host
exports.getHostBookings = (req, res) => {
  const { hostId } = req.params;

  if (!hostId) {
    return res.status(400).json({ message: "Host ID is required." });
  }

  Booking.getHostBookings(hostId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving bookings.", error: err });
    }

    res.status(200).json({ bookings: results });
  });
};

// Update booking request status
exports.updateRequestStatus = (req, res) => {
  const { requestId, newStatus } = req.body;

  if (!requestId || !newStatus) {
    return res.status(400).json({ message: "Request ID and new status are required." });
  }

  if (!['pending', 'accepted', 'rejected'].includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  Booking.updateRequestStatus(requestId, newStatus, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating request status.", error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Booking request not found." });
    }

    res.status(200).json({ message: "Request status updated successfully." });
  });
};
