const Users = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Make sure you have uuid installed
const fs = require('fs');

// Simple email validation function (example)
function isValidEmail(email) {
  // Adjust if you have specific domain validation
  const domain = email.split('@')[1];
  return domain;
}

exports.registerUser = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : "https://res.cloudinary.com/dsd4b2lkg/image/upload/v1718475943/kxrcwdacnp1vdbrwai6k.png";

  // Validate email domain
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email domain.' });
  }

  console.log(req.body);
  // Validate password and confirmation
  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: 'Passwords do not match.' });
  // }

  if (!name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user_id = uuidv4(); // Generate a unique user_id
  const timeZone = 'UTC';   // Default timezone if not provided (can be adjusted as needed)

  const newUser = {
    user_id,
    name,
    email,
    password,
    userPicUrl,
    timeZone
  };

  Users.findByEmail(email, (err, users) => {
    if (err) throw err;
    if (users.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    Users.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user', error: err });
      }
      res.status(201).json({ message: 'User registered successfully', userId: user_id });
    });
  });
};

// Authenticate user
exports.authUser = (req, res) => {
  const { email, password } = req.body;

  // Validate email domain if needed
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email domain.' });
  }

  Users.findByEmail(email, (err, users) => {
    if (err) throw err;
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user.user_id);
      res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.json({ 
        token: token,
        user_id:user.user_id

       });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};

// Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
