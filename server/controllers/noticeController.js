const db = require('../config/db');

exports.getNotice = (req, res) => {
    // Query to get all notifications for all users
    const getAllNotificationsQuery = `
        SELECT  message, status, created_at 
        FROM user_notification
        ORDER BY created_at DESC
    `;
  
    db.query(getAllNotificationsQuery, (err, notifications) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching notifications', error: err });
        }

        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found.' });
        }

        // Return the list of all notifications
        res.status(200).json({
            message: 'All notifications fetched successfully',
            notifications: notifications
        });
    });
};
