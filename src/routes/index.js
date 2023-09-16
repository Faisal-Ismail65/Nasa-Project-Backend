
const express = require('express')
const planetRouter = require('./planets.router')
const launchesRouter = require('./launches.router')


const router = express.Router()

router.use('/planets',planetRouter)
router.use('/launches',launchesRouter)


module.exports = router