const db = require('../config/db');

exports.slotDistribution = (req, res) => {
    db.query('SELECT status, COUNT(*) AS slot_count FROM slots GROUP BY status', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving slot distribution', error: err });
        }

        // Return the result as a success response
        res.status(200).json({ data: result });
    });
};

exports.dailyBookings=(req, res)=>{
    db.query('SELECT DATE(created_at) AS booking_date, COUNT(*) AS total_bookings FROM booking GROUP BY DATE(created_at) ORDER BY booking_date DESC',(err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving slot distribution', error: err });
        }

        // Return the result as a success response
        res.status(200).json({ data: result });
    });
}