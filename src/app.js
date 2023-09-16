const path = require('path');

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const app = express()






// Middlewares
app.use(cors({
    origin : 'http://localhost:3000',
}))

app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, '..','public')))


app.use('/v1',router)


app.use('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})



module.exports = app