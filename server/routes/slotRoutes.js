const express = require('express');
const {
  createNewSlot,

} = require('../controllers/slotControllers');
const {getMySlots}= require('../controllers/slotControllers')
const { protect } = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');

const slotRouter = express.Router();

 slotRouter.post('/create', protect, createNewSlot);
 slotRouter.get('/myslots', protect, getMySlots )


module.exports = slotRouter;