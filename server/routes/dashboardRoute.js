const express= require('express')
const router= express.Router()
const {slotDistribution, dailyBookings } = require('../controllers/dashboardController')

router.get('/slotstatus', slotDistribution)
router.get('/dailybookings', dailyBookings)

module.exports= router