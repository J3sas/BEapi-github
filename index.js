require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


const port = process.env.PORT || 3000



mongoose.connect(process.env.DB_URL)
.then(()=> app.listen(port,()=>{
    console.log(`App is listening to localhost:${port}`)
}),
e=>console.log(`error`,e))

//app.listen(port,()=>{console.log(`App is listening to localhost:${port}`)})



// configure routes 
const subscribersRouter = require('./routes/nwd-subscribers')
const subscribersWaterRouter = require('./routes/water-rate-subscribers')

app.use(bodyParser.json())
app.use('/nwd',subscribersRouter)
app.use('/water',subscribersWaterRouter)



