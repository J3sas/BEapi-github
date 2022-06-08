require('dotenv').config()
const express = require('express')
const router = express.Router()
const EcommProduct = require("../models/ecomm-products-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    try {
        const found = await EcommProduct.find({})
        
        res.send(payloadFormatter(found));
    } catch (error) {
        res.send(error);
    }
    
})

//  GET ID
router.get('/:id',getUserId,(req,res)=>{
    res.json(payloadFormatter(res.user))
})

//  Create one
router.post("/", async (req, res) => {
    try {
        const user = new EcommProduct(req.body)
    await user.save()
        .then((result) => {
            res.send(payloadFormatter(result))
        })
        .catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(error)
    }
    
});
// delete using whole json
// router.delete('/delete',async(req,res)=>{ 
//     await EcommProduct.findByIdAndDelete(req.body)
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


// delete using ID
router.delete('/',async(req,res)=>{ 
    await EcommProduct.findByIdAndDelete(req.body.id)
    .then((result) => {
        res.send(payloadFormatter(result))
    })
    .catch((err) => {
        res.send(err)
    })
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await EcommProduct.findById(req.body.id)
        Object.assign(oldData,req.body)
        oldData.save()
        .then((result) => {
            res.send(payloadFormatter(result))
        })
        .catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(error)
    }
})

// ----- Middlewares


async function getUserId(req,res,next){
    let user
    try {
        user = await EcommProduct.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message : 'Cannot find user'})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
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
            let price = arrayFromDb[index].price
            let quantity = arrayFromDb[index].quantity
            let description = arrayFromDb[index].description
            let imageSource = arrayFromDb[index].imageSource
            let ownerId = arrayFromDb[index].ownerId

            const objResponse = { id : _id,
                                 name : name,
                                 price : price,
                                 quantity : quantity,
                                 description : description,
                                 imageSource : imageSource,
                                 ownerId : ownerId
                                }
            tempUserArray.push(objResponse)
        }
    return tempUserArray
    }else{
        return  objResponse = { 
            id : arrayFromDb._id,
            name : arrayFromDb.name,
            price : arrayFromDb.price,
            quantity : arrayFromDb.quantity,
            description : arrayFromDb.description,
            imageSource : arrayFromDb.imageSource,
            ownerId : arrayFromDb.ownerId
           }
    }
        
}


module.exports =  router
