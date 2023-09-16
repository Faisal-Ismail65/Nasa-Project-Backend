
const mongoose = require('mongoose')

const launchesModelName = 'Launch'

const Schema = mongoose.Schema


const launchesSchema = new Schema({
    flightNumber:{
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required:true,
    } ,
    mission:{
        type: String,
        required: true,
    },
    rocket : {
        type : String,
        required :true,
    },
    target:{
        type: String,
        default: '',
    },
    customers:{
        type: Schema.Types.Array,
        default: ['ZTM','NASA']
    },
    upcoming : {
        type : Boolean,
        required : true,
        default: true,
    },
    success:{
        type : Boolean,
        default: true,
    },
},
{
   timestamps: true,
   collection : launchesModelName    
})


module.exports =  mongoose.model(launchesModelName,launchesSchema)









