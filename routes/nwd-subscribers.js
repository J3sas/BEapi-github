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
router.post("/create", async (req, res) => {
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
router.delete('/delete',async(req,res)=>{ 
    await User.findByIdAndDelete(req.body)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})


// delete using ID
router.delete('/:id',async(req,res)=>{ 
    await User.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.patch('/:userId',async(req,res)=>{
    try {
        const oldData = await User.findById(req.params.userId)
        Object.assign(oldData,req.body)
        oldData.save()
        res.send({message : 'Success'})
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
