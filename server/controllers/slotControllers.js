const bcrypt = require('bcryptjs');
const fs = require('fs');
const AuctionModels = require('../models/auctionModels');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid'); 

exports.createNewSlot = (req, res) => {
  userId= req.user.user_id;
  slotId= uuidv4();
    const { slotName, startTime, endTime  } = req.body;
    console.log(req.body)
    const query= 'INSERT INTO slots (slot_id, slot_name, user_id, start_time, end_time ) VALUES (? ,?, ?, ?, ?)'
    db.query(query, [slotId,slotName, userId, startTime, endTime ], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching teams', error: err });
      }
      res.status(200).json(result);
    });
  };


