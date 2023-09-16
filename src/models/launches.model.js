const axios = require('axios')
const LaunchRepo = require('../repositories/launches.repo')

const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query'

const loadLaunchesData = async ()=>{
    const launch = await LaunchRepo.findLaunchByFlightNumber(1)
    if(launch){
        console.log('Launch Data Already Downloaded...')
    }else{
        console.log('Downloading Launch Data....')
    const response = await axios.post(SPACEX_API_URL,
        {
        query: {},
            options:{
                pagination : false,
                populate:[
                {
                    path: 'rocket',
                    select:{
                        name: 1,
                    }
                },
                {
                    path: 'payloads',
                    select:{
                        customers:1,
                    }
                },
            ]
            }
        }
    )

    if(response.status != 200){
        console.log('Problem Downloading Launch Data...')
        throw new Error('Launch Data Download Failed') 
    }

    const launchDocs = response.data.docs
    console.log(launchDocs.length)
    for(const launchDoc of launchDocs){

        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload)=> payload['customers'])
        const launch = {
            flightNumber : launchDoc['flight_number'],
            mission : launchDoc['name'],
            rocket : launchDoc['rocket']['name'],
            launchDate : launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        // console.log(launchDoc['success'])
        await LaunchRepo.scheduleNewLaunch(launch)
    }
    }
    
}

module.exports = {
    loadLaunchesData,
}