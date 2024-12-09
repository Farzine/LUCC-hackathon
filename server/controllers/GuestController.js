const Guest = require('../models/Guest');

// Fetch guest details by slot_id
exports.getGuestsBySlotId = (req, res) => {
  const { slotId } = req.params;

  if (!slotId) {
    return res.status(400).json({ message: "Slot ID is required." });
  }

  Guest.getGuestsBySlotId(slotId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving guest details.", error: err });
    }

    res.status(200).json({ guests: results });
  });
};
