const express = require('express');
const {
  createNewSlot,
  // getPlayersByTournamentId,
  // getTeamsDetailsByTournamentId,
  // startAuction,
  // update_pause,
  // update_player_index,
  // fetch_real_time_info,
  // fetch_last_bidding_team,
  // team_details_manager
} = require('../controllers/slotControllers');
const { protect } = require('../middlewares/authMiddleware');
const { upload, uploadToCloudinary } = require('../middlewares/cloudinaryMiddleware');
const slotRouter = express.Router();

 slotRouter.post('/create', protect, createNewSlot);
// slotRouter.post('/players', protect, getPlayersByTournamentId);
// slotRouter.post('/team_details_manager', protect, team_details_manager);
// slotRouter.post('/start', protect, startAuction);
// slotRouter.post('/update_pause', protect, update_pause);
// slotRouter.post('/update_player_index', protect, update_player_index);
// slotRouter.post('/realtime_info', protect, fetch_real_time_info);
// slotRouter.post('/last_bidding_team', protect, fetch_last_bidding_team);



module.exports = slotRouter;