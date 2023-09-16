const LaunchesModel = require('../models/launches.mongo')



const scheduleNewLaunch = async (obj)=>{
    return await LaunchesModel.create(obj);

}

const findAllLaunches = async(skip, limit) =>{
    return await LaunchesModel.find(
        {},
        {_id:0,__v:0},
        )
        .sort({flightNumber:1})
        .skip(skip)
        .limit(limit)
}

const findLatestFlightNumber = async()=>{
    const launch = await LaunchesModel.findOne({}).sort({flightNumber : -1})
    if(!launch){
        return 100;
    }
    return launch.flightNumber;
    
}

const findLaunchByFlightNumber = async (flightNumber)=>{
    return await LaunchesModel.findOne({flightNumber})
}

const findOneAndUpdate = async(flightNumber,payload) =>{
    return await LaunchesModel.findOneAndUpdate({flightNumber},{$set:payload},{new:true})
}


module.exports = {
    findLaunchByFlightNumber,
    findAllLaunches,
    scheduleNewLaunch,
    findLatestFlightNumber,
    findOneAndUpdate,
}