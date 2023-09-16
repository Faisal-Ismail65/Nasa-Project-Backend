const planetsModel = require('../models/planets.mongo')


const findAllPlanets = async () =>{
return await planetsModel.find({},{__v:0,_id:0});
}

const findOnePlanetByName = async(keplerName)=>{
return await planetsModel.findOne({keplerName})
}


module.exports ={
    findAllPlanets,
    findOnePlanetByName,
}