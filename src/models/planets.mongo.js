const mongoose = require('mongoose')

const PlanetsModelName = 'Planet'

const Schema = mongoose.Schema


const PlanetSchema = new Schema({
  keplerName : {
    type : String,
    required : true,
  }
},{
  timestamps :true,
  collection : PlanetsModelName,
})



module.exports = mongoose.model(PlanetsModelName,PlanetSchema)