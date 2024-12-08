// controllers/searchController.js
const Slots = require('../models/Slots');

exports.searchSlots = (req, res) => {
  const { hostName, status, startDate, endDate, startTimeFilter, endTimeFilter } = req.query;

  const filters = {
    hostName: hostName || null,
    status: status || null,
    startDate: startDate || null,
    endDate: endDate || null,
    startTimeFilter: startTimeFilter || null,
    endTimeFilter: endTimeFilter || null
  };

  Slots.searchSlots(filters, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching slots', error: err });
    }

    res.status(200).json({ slots: results });
  });
};
