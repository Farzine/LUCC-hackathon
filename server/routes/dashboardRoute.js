const express= require('express')
const router= express.Router()
const {slotDistribution } = require('../controllers/dashboardController')

router.get('/slotstatus', slotDistribution)


module.exports= router