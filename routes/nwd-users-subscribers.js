require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require("../models/nwd-user-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    
    try {
        const found = await User.find({})
        res.send(payloadFormatter(found))
    } catch (error) {
        res.send(error)
    }
})


//  GET ID
router.get('/:id',getUserId,(req,res)=>{
    try {

        res.send(payloadFormatter(res.user))
    } catch (error) {
        res.send(error)
    }
    
})

//  Create one
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        .then((result) => {
            res.send(payloadFormatter(result))
        })
        .catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(err)
    }
    
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
    await User.findByIdAndDelete(req.body.id)
    .then((result) => {
        res.send(payloadFormatter(result))
    })
    .catch((err) => {
        res.send({message : 'DB Failed',err })
    })
    .catch((err) => {
        res.send(err)
    })
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await User.findById(req.body.id)
        Object.assign(oldData,req.body)
        oldData.save()
        .then((result) => {
            res.send(payloadFormatter(result))
        })
        .catch((err) => {
            res.send({message : 'DB Failed',err })
        })
    } catch (error) {
        res.send({message : 'error',error })
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
        return res.status(500).json({message : error})
    }
    res.user = user
    next()
}

function payloadFormatter(arrayFromDb) {
    // re format the response 
    let tempUserArray = []
    if (arrayFromDb.length >= 1) {
        for (let index = 0; index < arrayFromDb.length; index++) {
            let _id = arrayFromDb[index]._id
            let name = arrayFromDb[index].name
            let address = arrayFromDb[index].address
            let accountNum = arrayFromDb[index].accountNum
            let rateClass = arrayFromDb[index].rateClass
            let meterNum = arrayFromDb[index].meterNum
            let prevRdgDate = arrayFromDb[index].prevRdgDate
            let balancePrevBill = arrayFromDb[index].balancePrevBill
            let totalCurrBill = arrayFromDb[index].totalCurrBill
            let accountType = arrayFromDb[index].accountType
            let billInfo = arrayFromDb[index].billInfo
            let prevReading = arrayFromDb[index].prevReading
            let hasActiveBill = arrayFromDb[index].hasActiveBill
            let hasReqPayment = arrayFromDb[index].hasReqPayment
            let paidBillInfo = arrayFromDb[index].paidBillInfo
            const objResponse = { id : _id,
                                 name : name,
                                 address : address,
                                 accountNum : accountNum,
                                 rateClass : rateClass,
                                 meterNum : meterNum,
                                 prevRdgDate : prevRdgDate,
                                 balancePrevBill : balancePrevBill,
                                 totalCurrBill : totalCurrBill,
                                 accountType : accountType,
                                 billInfo : billInfo,
                                 prevReading : prevReading,
                                 hasActiveBill : hasActiveBill,
                                 hasReqPayment : hasReqPayment,
                                 paidBillInfo : paidBillInfo,
                                }
            tempUserArray.push(objResponse)
        }
    return tempUserArray
    }else{
        return  objResponse = { id : arrayFromDb._id,
            name : arrayFromDb.name,
            address : arrayFromDb.address,
            accountNum : arrayFromDb.accountNum,
            rateClass : arrayFromDb.rateClass,
            meterNum : arrayFromDb.meterNum,
            prevRdgDate : arrayFromDb.prevRdgDate,
            balancePrevBill : arrayFromDb.balancePrevBill,
            totalCurrBill : arrayFromDb.totalCurrBill,
            accountType : arrayFromDb.accountType,
            billInfo : arrayFromDb.billInfo,
            prevReading : arrayFromDb.prevReading,
            hasActiveBill : arrayFromDb.hasActiveBill,
            hasReqPayment : arrayFromDb.hasReqPayment,
            paidBillInfo : arrayFromDb.paidBillInfo,
           }
    }
        
}


module.exports =  router
