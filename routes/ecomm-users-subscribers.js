require('dotenv').config()
const express = require('express')
const router = express.Router()
const EcommUser = require("../models/ecomm-user-schema")


// ----- Routes

//  GET ALL
router.get('/',async(req,res)=>{
    try {
        const found  = await EcommUser.find({})
    res.send(payloadFormatter(found));
    //res.send(found);
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
        const user = new EcommUser(req.body)
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
//     await EcommUser.findByIdAndDelete(req.body)
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


// delete using ID
router.delete('/',async(req,res)=>{ 
    try {
        await EcommUser.findByIdAndDelete(req.body.id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
    } catch (error) {
        res.send(err)
    }
   
})

router.patch('/',async(req,res)=>{
    try {
        const oldData = await EcommUser.findById(req.body.id)
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
        user = await EcommUser.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message : 'Cannot find user'})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.user = user
    next()
}
// buggy pa to
function payloadFormatter(arrayFromDb) {
    // re format the response 
    let tempUserArray = []
    if (arrayFromDb.length >= 1) {
        for (let index = 0; index < arrayFromDb.length; index++) {
            let _id = arrayFromDb[index]._id
            let name = arrayFromDb[index].name
            let address = arrayFromDb[index].address
            let contactNum = arrayFromDb[index].contactNum
            let products = arrayFromDb[index].products
            let orders = arrayFromDb[index].orders
            let cart = arrayFromDb[index].cart
            let password = arrayFromDb[index].password
            let position = arrayFromDb[index].position
            const objResponse = { id : _id,
                                 name : name,
                                 address : address,
                                 contactNum : contactNum,
                                 products : products,
                                 orders : orders,
                                 cart : cart,
                                 password : password,
                                 position : position
                                 
                                }
            tempUserArray.push(objResponse)
        }
    return tempUserArray
    }else{
        return  objResponse = { 
            id : arrayFromDb._id,
            name : arrayFromDb.name,
            address : arrayFromDb.address,
            contactNum : arrayFromDb.contactNum,
            products : arrayFromDb.products,
            orders : arrayFromDb.orders,
            cart : arrayFromDb.cart,
            password : arrayFromDb.password,
            position : arrayFromDb.position
           }
    }
        
}


module.exports =  router
