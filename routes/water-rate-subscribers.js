require('dotenv').config()
const express = require('express')
const router = express.Router()
const WaterRate = require("../models/nwd-water-rate-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    res.send(await WaterRate.find({}));
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await WaterRate.findById(req.body._id)
        Object.assign(oldData,req.body)
        oldData.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send({message : 'DB Failed',err })
        })
    } catch (error) {
        res.send(error)
    }
})


//  POST IS NOT ALLOWED ONLY UPDATE
// router.post("/create", async (req, res) => {
//     const user = new WaterRate(req.body)
//     await user.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// });

// router.delete('/:id',async(req,res)=>{ 
//     await WaterRate.findByIdAndDelete(req.params.id)
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


module.exports =  router
