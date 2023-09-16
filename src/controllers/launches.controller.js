const LaunchRepo = require('../repositories/launches.repo')
const PlanetsRepo = require('../repositories/planets.repo')
const {getPagination} = require('../services/query')



const getAllLaunches = async (req,res)=>{
    const {skip,limit} = getPagination(req.query)

    let launches = await LaunchRepo.findAllLaunches(skip,limit)
    return res.status(200).json(launches)
}

const addNewLaunch = async (req,res) => {
    const launch  = req.body;

    if(!(launch.mission || launch.rocket || launch.launchDate || launch.target)){
        return res.status(400).json({error: 'Please Provide Required Data with Request'})
    }
    launch.launchDate = new Date(launch.launchDate)


    if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({error: 'Invalid Launch Date'})
    }

    // Or 
    
    if(isNaN(launch.launchDate)){
        return res.status(400).json({error: 'Invalid Launch Date'})
    }

    let Planet = await PlanetsRepo.findOnePlanetByName(launch.target)
    
    if(!Planet){
        return res.status(404).json({error:'Planet Not Found!'})
    }

    launch.flightNumber = await LaunchRepo.findLatestFlightNumber() + 1

   let newLaunch =  await LaunchRepo.scheduleNewLaunch(launch)



    return res.status(201).json(newLaunch)
}

const abortLaunch = async (req,res) =>{
    const id = Number(req.params.id)

    console.log(id)

    const Launch = await LaunchRepo.findLaunchByFlightNumber(id) 

    if(!Launch){
        return res.status(400).json({error: 'Launch Not Found'})
    }

    
    
    const aborted = await LaunchRepo.findOneAndUpdate(id,{upcoming:false,success:false})

    if(!aborted){
        return res.status(400).json({error: 'Launch Not Aborted'})
    }

    return res.status(200).json(aborted)

    
}
 

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
}