const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ecommUser = new Schema({
    name : {
        type : String,
        required : true,
        default : ''
    },
    address : {
        type : String,
        required : true,
        default : ''
    },
    contactNum : {
        type : String,
        required : true,
        default : '0'
    },
    products : {
        type : Array,
        default : []
    },
    orders : {
        type : Array,
        default : []
    },
    cart : {
        type : Array,
        default : []
    },
    password : {
        type : String,
        required : true,
        default : ''
    },
    position : {
        type : String,
        default : ''
    },
},{ timestamps: true });

// function generateTime() {
//     let date_ob = new Date();
//     let date = ("0" + date_ob.getDate()).slice(-2);
//     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//     let year = date_ob.getFullYear();
//     let hours = date_ob.getHours();
//     let minutes = date_ob.getMinutes();
//     let seconds = date_ob.getSeconds();
//     return year+month+date+hours+minutes+seconds
//     }

const EcommUsers = mongoose.model("ecommUsers",ecommUser); // table name should be small letters
module.exports = EcommUsers;