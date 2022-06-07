require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require("../models/nwd-user-schema")


// ----- Routes
router.get('/',(req,res)=>{
    res.send('Hello world')
})

router.get('/:id',getUserId,(req,res)=>{
    res.json(res.user)
})


// ----- Middlewares


async function getUserId(req,res,next){
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message : 'Cannot find user'})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.user = user
    next()
}


module.exports =  router
