
const http = require('http')
const app = require('./app')
const {loadPlanetData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.model')
const {mongoConnect} = require('./config/database')



require('dotenv').config()

// console.log(process.env)
// console.log(process.env.PORT)
// console.log(process.env.MONGO_URL)






const server = http.createServer(app)



const Port = process.env.PORT || 5000





async function startServer(){
    await mongoConnect()
    await loadPlanetData()
    await loadLaunchesData()
    server.listen(Port,()=>console.log(`Server is Running on ${Port}...`))
}

startServer()


