require('dotenv').config()
const express = require('express')
const router = express.Router()
const WaterRate = require("../models/nwd-water-rate-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    try {
        const found = await WaterRate.find({})
        res.send([payloadFormatter(found,'Array')])
    } catch (error) {
        res.send(error);
    }
    
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await WaterRate.findById(req.body.id)
        Object.assign(oldData,req.body)
        oldData.save()
        .then((result) => {
            res.send(payloadFormatter(result,'Object'))
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

function payloadFormatter(arrayFromDb,dataResType) {
    // re format the response 
    if (dataResType == 'Array') {
        return objResponse = { 
            id : arrayFromDb[0]._id,
            residence : arrayFromDb[0].residence,
            commercial : arrayFromDb[0].commercial
           }    
    }else{
        return objResponse = { 
            id : arrayFromDb._id,
            residence : arrayFromDb.residence,
            commercial : arrayFromDb.commercial
           }   
    }
        
}


module.exports =  router
