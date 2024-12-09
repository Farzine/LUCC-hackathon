CREATE DATABASE lucc;

CREATE TABLE users (
  user_id  VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  time_zone VARCHAR(255) NOT NULL,
  user_pic_url VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE slots(
  slot_id VARCHAR(255) PRIMARY KEY,
  slot_name VARCHAR(255) NOT NULL,  
  user_id VARCHAR(50) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('available', 'booked') NOT NULL DEFAULT 'booked',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE booking(
  booking_id VARCHAR(255) PRIMARY KEY ,
  slot_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  role VARCHAR(255) NOT NULL,
  status ENUM('pending', 'booked') NOT NULL DEFAULT 'booked',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES slots (slot_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE booking_request(
  request_id VARCHAR(255) PRIMARY KEY,
  slot_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES slots (slot_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE user_notification(
  notification_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  message VARCHAR(255) NOT NULL,
  status ENUM('unread', 'read') NOT NULL DEFAULT 'unread',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);
