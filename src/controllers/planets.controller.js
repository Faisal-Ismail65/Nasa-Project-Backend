// const {planets} = require('../models/planets.model')
const PlanetsRepo = require('../repositories/planets.repo')


const getAllPlanets = async (req,res) =>{
    try{
        let planets = await PlanetsRepo.findAllPlanets();
        return res.status(200).json(planets);
    }catch(err){
        console.log(err);
    }
    
}


module.exports = {
    getAllPlanets,
}