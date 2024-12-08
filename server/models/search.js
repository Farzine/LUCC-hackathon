// models/search.js
const db = require('../config/db');

const Slots = {};

Slots.searchSlots = (filters, callback) => {
  // Base query joining users (hosts) and slots
  let query = `
    SELECT s.slot_id, s.slot_name, s.user_id, s.start_time, s.end_time, s.status, u.name AS host_name
    FROM slots s
    JOIN users u ON s.user_id = u.user_id
    WHERE 1=1
  `;

  const values = [];

  // Apply filters dynamically
  if (filters.hostName) {
    query += ` AND u.name LIKE ?`;
    values.push(`%${filters.hostName}%`);
  }

  if (filters.status) {
    query += ` AND s.status = ?`;
    values.push(filters.status);
  }

  // Date range filtering (if startDate and endDate are provided)
  // startDate and endDate should be in a format the DB can parse, e.g., 'YYYY-MM-DD' or full datetime
  if (filters.startDate) {
    query += ` AND s.start_time >= ?`;
    values.push(filters.startDate);
  }

  if (filters.endDate) {
    query += ` AND s.end_time <= ?`;
    values.push(filters.endDate);
  }

  // Optional time preference filters (if needed)
  // For example, if filters specify a startTimeFilter or endTimeFilter specifically:
  if (filters.startTimeFilter) {
    query += ` AND TIME(s.start_time) >= TIME(?)`;
    values.push(filters.startTimeFilter);
  }

  if (filters.endTimeFilter) {
    query += ` AND TIME(s.end_time) <= TIME(?)`;
    values.push(filters.endTimeFilter);
  }

  // Add ordering if needed
  query += ` ORDER BY s.start_time ASC`;

  db.query(query, values, callback);
};

module.exports = Slots;
