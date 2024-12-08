const bcrypt = require('bcryptjs');
const fs = require('fs');
const AuctionModels = require('../models/auctionModels');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid'); 

exports.createNewSlot = (req, res) => {
  const userId = req.user.user_id;
  const slotId = uuidv4();
  const { slotName, startTime, endTime } = req.body;

  console.log(req.body);

  // Check if the time slot already overlaps with another slot for any user
  const checkOverlapQuery = `
    SELECT * FROM slots 
    WHERE (start_time < ? AND end_time > ?) 
       OR (start_time < ? AND end_time > ?) 
       OR (? < end_time AND ? > start_time)
  `;

  db.query(checkOverlapQuery, [startTime, startTime, endTime, endTime, startTime, endTime], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking for overlap', error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Slot time conflicts with another existing slot.' });
    }

    // If no overlap, proceed with inserting the new slot
    const insertSlotQuery = 'INSERT INTO slots (slot_id, slot_name, user_id, start_time, end_time) VALUES (?, ?, ?, ?, ?)';
    db.query(insertSlotQuery, [slotId, slotName, userId, startTime, endTime], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating new slot', error: err });
      }

      // Insert the booking for the user as 'host'
      const bookingId = uuidv4();
      const insertBookingQuery = 'INSERT INTO booking (booking_id, slot_id, user_id, role) VALUES (?, ?, ?, ?)';
      db.query(insertBookingQuery, [bookingId, slotId, userId, 'host'], (err, bookingResult) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating booking', error: err });
        }

        res.status(200).json({
          message: 'Slot created successfully and booking as host created.',
          slot: result,
          booking: bookingResult
        });
      });
    });
  });
};

exports.updateSlot = (req, res) => {
  const { slotId, slotName, startTime, endTime } = req.body;
  const userId = req.user.user_id;

  // Check if the slot exists and belongs to the correct user
  const checkSlotQuery = 'SELECT * FROM slots WHERE slot_id = ? AND user_id = ?';
  db.query(checkSlotQuery, [slotId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking slot existence', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Slot not found or you do not have permission to update it.' });
    }

    // Check if the time overlap condition is satisfied before updating
    const checkOverlapQuery = `
      SELECT * FROM slots 
      WHERE slot_id != ? AND (
        (start_time < ? AND end_time > ?) 
        OR (start_time < ? AND end_time > ?) 
        OR (? < end_time AND ? > start_time)
      )
    `;

    db.query(checkOverlapQuery, [slotId, startTime, startTime, endTime, endTime, startTime, endTime], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking for overlap', error: err });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: 'Slot time conflicts with another existing slot.' });
      }

      // Proceed to update the slot if no overlap
      const updateQuery = `
        UPDATE slots 
        SET slot_name = ?, start_time = ?, end_time = ?
        WHERE slot_id = ? AND user_id = ?
      `;

      db.query(updateQuery, [slotName, startTime, endTime, slotId, userId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating slot', error: err });
        }

        if (result.changedRows === 0) {
          return res.status(200).json({ message: 'No changes were made to the slot.' });
        }

        res.status(200).json({ message: 'Slot updated successfully', result });
      });
    });
  });
};

exports.getMySlots = (req, res) => {  // Use getMyslots here, not getMySlots
    console.log(req.user)
    const userId = req.user.user_id;
    const query = 'SELECT * FROM slots WHERE user_id = ?';
  
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching slots', error: err });
      }
      res.status(200).json(result);  // Send back the result from the DB
    });
  };


