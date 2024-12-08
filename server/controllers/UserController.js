const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');



exports.updateUser = (req, res) => {
  const { email, password, name, newPassword, timeZone } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : null;
  const userId = req.user.user_id; // Ensure your auth middleware sets req.user.user_id

  // Confirm email and password for authentication
  User.findByEmail(email, (err, users) => {
    if (err || users.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const updatedUser = {};

    if (name) updatedUser.name = name;
    if (userPicUrl) updatedUser.userPicUrl = userPicUrl;
    if (timeZone) updatedUser.timeZone = timeZone;
    if (newPassword) {
      updatedUser.password = bcrypt.hashSync(newPassword, 10);
    }

    User.update(userId, updatedUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating user', error: err });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });
};

exports.getUserDetails = (req, res) => {
  const userId = req.user.user_id;

  User.findByUserId(userId, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user details', error: err });
    }
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    const userDetails = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      user_pic_url: user.user_pic_url,
      time_zone: user.time_zone,
    };

    res.status(200).json(userDetails);
  });
};
