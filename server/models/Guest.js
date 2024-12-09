const db = require('../config/db');

const Guest = {};

// Fetch guest details by slot_id
Guest.getGuestsBySlotId = (slotId, callback) => {
  const query = `
    SELECT 
      u.name, 
      u.email, 
      u.user_pic_url AS profile_picture, 
      u.time_zone
    FROM booking_request br
    JOIN users u ON br.user_id = u.user_id
    WHERE br.slot_id = ? AND br.status = 'accepted'
  `;

  db.query(query, [slotId], callback);
};

module.exports = Guest;
