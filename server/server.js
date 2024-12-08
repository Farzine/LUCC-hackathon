const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/userRutes');
const auctionRouter = require('./routes/slotRoutes');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const cors = require("cors");


require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/user', homeRoutes);
app.use('/api/auction', auctionRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//register route post-http://localhost:5000/api/auth/register
//login route post-http://localhost:5000/api/auth/login
//login route post-http://localhost:5000/api/user/update-user
//create slot post-http://localhost:5000/api/auction/create