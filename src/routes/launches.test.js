const request = require('supertest')
const app = require('../app')
const {mongoConnect, mongoDisconnect} = require('../config/database')
const { loadPlanetData } = require('../models/planets.model')



describe('Launches API',()=>{

    beforeAll(async ()=>{
        await mongoConnect()
        await loadPlanetData()
    })

    afterAll(async()=>{
        await mongoDisconnect()
    })

describe('Test GET /launches',  ()=>{
    test('It should respond with 200 success',async ()=>{
        const response = await request(app).get('/v1/launches')
        .expect('Content-Type',/json/)
        .expect(200);
        // expect(response.statusCode).toBe(200)
    })
})


describe('Test POST /launch',()=>{
    const completeLaunchData = {
            mission : 'USS Enterprise',
            rocket : 'NCC 1701-D',
            target :'Kepler-1652 b',
            launchDate : 'January 4, 2028', 
    }

    const launchDatWithoutDate = {
            mission : 'USS Enterprise', 
            rocket : 'NCC 1701-D',
            target :'Kepler-1652 b',
    }

    test('It should respond with 201 created', async ()=>{
        const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type',/json/)
        .expect(201)
        
        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()

        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDatWithoutDate)
    })

    test('It should catch missing required properties', async ()=>{
        
    })
    test('It should catch invalid dates', async ()=>{
        const response = await request(app)
        .post('/v1/launches')
        .send(launchDatWithoutDate)
        .expect('Content-Type',/json/)
        .expect(400)   
        
        expect(response.body).toStrictEqual({error: 'Invalid Launch Date'})  
    })
})


})
