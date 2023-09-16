const express = require('express')

const planetController = require('../controllers/planets.controller')

const planetRouter =   express.Router();


planetRouter.get('/',planetController.getAllPlanets)


module.exports = planetRouter;