const express = require('express');
const {
  createNewSlot,
  updateSlot
} = require('../controllers/slotControllers');
const {getMySlots}= require('../controllers/slotControllers')
const { protect } = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');

const slotRouter = express.Router();

 slotRouter.post('/create', protect, createNewSlot);
 slotRouter.get('/myslots', protect, getMySlots )
 slotRouter.put('/updatemyslot', protect, updateSlot)


module.exports = slotRouter;