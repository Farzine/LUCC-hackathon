const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/userRutes');
const slotRouter = require('./routes/slotRoutes');
const searchRoutes = require('./routes/slotRoutes');
const bookings= require('./routes/bookingReqRoute')
const dashboard= require('./routes/dashboardRoute')
const notice= require('./routes/noticeRouter')
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
app.use('/api/slot', slotRouter);
app.use('/api/search', searchRoutes);
app.use('/api/booking', bookings);
app.use('/api/dashboard', dashboard)
app.use('/api/notice', notice)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//register route post-http://localhost:5000/api/auth/register
//login route post-http://localhost:5000/api/auth/login
//login route post-http://localhost:5000/api/user/update-user
//create slot post-http://localhost:5000/api/slot/create
//get my all slot post-http://localhost:5000/api/slot/myslots
////update slot post-http://localhost:5000/api/slot/updatemyslot
// get all slots get-http://localhost:5000/api/slot/bookedslots
//logout route post-http://localhost:5000/api/auth/logout
//create search route post-http://localhost:5000/api/search/create-search
//get user details get-http://localhost:5000/api/user/user-details
// bookingRequest post- http://localhost:5000/api/booking/book
// update bookingRequest put- http://localhost:5000/api/booking/book/updatebooking

// slot status get- http://localhost:5000/api/dashboard/slotstatus
// daily slots bookings get- http://localhost:5000/api/dashboard/dailybookings

// get user role get- http://localhost:5000/api/booking/book/get-role
// get- http://localhost:5000/api/notice/allnotice