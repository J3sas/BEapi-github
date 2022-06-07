require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose");



const port = process.env.PORT || 3000



app.get('/',(req,res)=>{
    res.send('Hello world')
})

mongoose.connect(process.env.DB_URL)
.then(()=> app.listen(port,()=>{
    console.log(`App is listening to localhost:${port}`)
}),
e=>console.log(`error`,e))


const subscribersRouter = require('./routes/nwd-subscribers')
app.use('/nwd',subscribersRouter)



