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
