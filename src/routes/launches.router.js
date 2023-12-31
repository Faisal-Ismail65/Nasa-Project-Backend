const express = require('express')
const launchesController = require('../controllers/launches.controller')


const launchesRouter  = express.Router()


launchesRouter.get('/',launchesController.getAllLaunches)
launchesRouter.post('/',launchesController.addNewLaunch)
launchesRouter.delete('/:id',launchesController.abortLaunch)


module.exports = launchesRouter