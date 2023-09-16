const mongoose = require('mongoose')
require('dotenv').config();
const mongoConnect = async ()=>{
   await mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('Database is Connected');});
}


const mongoDisconnect = async()=>{
    return await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};
