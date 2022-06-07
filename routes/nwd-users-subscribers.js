require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require("../models/nwd-user-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    res.send(await User.find({}));
})

//  GET ID
router.get('/:id',getUserId,(req,res)=>{
    res.json(res.user)
})

//  Create one
router.post("/", async (req, res) => {
    const user = new User(req.body)
    await user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
});
// delete using whole json
// router.delete('/',async(req,res)=>{ 
//     await User.findByIdAndDelete(req.body._id)
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


// delete using ID
router.delete('/',async(req,res)=>{ 
    await User.findByIdAndDelete(req.body._id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await User.findById(req.body._id)
        Object.assign(oldData,req.body)
        oldData.save()
        .then((result) => {
            res.send(result)
        })
    } catch (error) {
        res.send(error)
    }
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
