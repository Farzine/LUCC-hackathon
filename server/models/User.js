const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Users = {};

// Create a new user
Users.create = (users, callback) => {
  const { user_id, name, email, userPicUrl, password, timeZone } = users;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `INSERT INTO users (user_id, name, email, user_pic_url, password, time_zone) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [user_id, name, email, userPicUrl, hashedPassword, timeZone], callback);
};

// Find a user by email
Users.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

// findByRegNo -> findByUserId
Users.findByUserId = (user_id, callback) => {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  db.query(query, [user_id], callback);
};

// Update user details
Users.update = (userId, updatedUser, callback) => {
  const fields = [];
  const values = [];

  if (updatedUser.name) {
    fields.push('name = ?');
    values.push(updatedUser.name);
  }

  if (updatedUser.timeZone) {
    fields.push('time_zone = ?');
    values.push(updatedUser.timeZone);
  }

  if (updatedUser.userPicUrl) {
    fields.push('user_pic_url = ?');
    values.push(updatedUser.userPicUrl);
  }

  if (updatedUser.password) {
    const hashedPassword = bcrypt.hashSync(updatedUser.password, 10);
    fields.push('password = ?');
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    return callback(null, { message: 'No fields to update' });
  }

  const query = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
  values.push(userId);

  db.query(query, values, callback);
};

// findTournamentsByUser -> findSlotByUser
// This function will find all slots created by a given user (i.e., where the user is the host).
Users.findSlotByUser = (userId, callback) => {
  const query = `SELECT * FROM slots WHERE user_id = ?`;
  db.query(query, [userId], callback);
};

// createTournament -> createSlot
// Create a new slot hosted by a user
Users.createSlot = (slot, callback) => {
  const { slot_id, slot_name, user_id, start_time, end_time } = slot;
  const query = `INSERT INTO slots (slot_id, slot_name, user_id, start_time, end_time) 
                 VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [slot_id, slot_name, user_id, start_time, end_time], callback);
};

// updateTournament -> updateSlot
Users.updateSlot = (slotId, updatedSlot, userId, callback) => {
  const fields = [];
  const values = [];

  if (updatedSlot.slot_name) {
    fields.push('slot_name = ?');
    values.push(updatedSlot.slot_name);
  }

  if (updatedSlot.start_time) {
    fields.push('start_time = ?');
    values.push(updatedSlot.start_time);
  }

  if (updatedSlot.end_time) {
    fields.push('end_time = ?');
    values.push(updatedSlot.end_time);
  }

  if (updatedSlot.status) {
    fields.push('status = ?');
    values.push(updatedSlot.status);
  }

  if (fields.length === 0) {
    return callback(null, { message: 'No fields to update' });
  }

  const query = `UPDATE slots SET ${fields.join(', ')} WHERE slot_id = ? AND user_id = ?`;
  values.push(slotId, userId);

  db.query(query, values, callback);
};

// findCurrentTournamentByUser -> findCurrentSlotByUser
// For example, this could find a currently ongoing slot by user_id. 
// Here we assume "current" means a slot that includes the current time.
Users.findCurrentSlotByUser = (userId, callback) => {
  const query = `
    SELECT * FROM slots 
    WHERE user_id = ? 
    AND start_time <= NOW() 
    AND end_time >= NOW()
  `;
  db.query(query, [userId], callback);
};

// findParticipatedTournamentsByUser -> findBookingSlotByUser
// Find all slots that a user has booked.
Users.findBookingSlotByUser = (userId, callback) => {
  const query = `
    SELECT s.*, b.status as booking_status, b.role as booking_role 
    FROM booking b
    INNER JOIN slots s ON b.slot_id = s.slot_id
    WHERE b.user_id = ?
  `;
  db.query(query, [userId], callback);
};

// findTournamentRoleByUser -> findBookingRoleByUser
// Given a slot_id and a user_id, find the role this user booked the slot with.
Users.findBookingRoleByUser = (slotId, userId, callback) => {
  const query = `SELECT role FROM booking WHERE slot_id = ? AND user_id = ?`;
  db.query(query, [slotId, userId], callback);
};

// getTournamentInfo -> getSlotInfo
// Get info about a particular slot.
Users.getSlotInfo = (slotId, callback) => {
  const query = `SELECT slot_name, start_time, end_time, status FROM slots WHERE slot_id = ?`;
  db.query(query, [slotId], callback);
};

// createMemberRequest -> createBookingRequest
Users.createBookingRequest = (request, callback) => {
  const { request_id, slot_id, user_id } = request;
  const query = `INSERT INTO booking_request (request_id, slot_id, user_id) VALUES (?, ?, ?)`;
  db.query(query, [request_id, slot_id, user_id], callback);
};

// createParticipatedTournament -> createBookingSlot
// This creates a booking (i.e., a user books a slot).
Users.createBookingSlot = (booking, callback) => {
  const { booking_id, slot_id, user_id, role } = booking;
  const query = `INSERT INTO booking (booking_id, slot_id, user_id, role) VALUES (?, ?, ?, ?)`;
  db.query(query, [booking_id, slot_id, user_id, role], callback);
};

// deleteMemberRequest -> deleteBookingRequest
Users.deleteBookingRequest = (requestId, callback) => {
  const query = 'DELETE FROM booking_request WHERE request_id = ?';
  db.query(query, [requestId], callback);
};

// If you need to handle notifications or other logic, you can create new functions similar to the above patterns.

// Additional functions for notifications if needed:
// For example:
// Users.createNotification = (notification, callback) => {
//   const { notification_id, user_id, message } = notification;
//   const query = `INSERT INTO user_notification (notification_id, user_id, message) VALUES (?, ?, ?)`;
//   db.query(query, [notification_id, user_id, message], callback);
// };

module.exports = Users;
