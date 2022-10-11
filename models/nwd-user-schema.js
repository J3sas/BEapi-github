const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type :String,
        required : true
    },
    accountNum : {
        type :String,
        required : true
    },
    rateClass : {
        type :String,
        required : true
    },
    meterNum : {
        type :String,
        required : true
    },
    prevRdgDate : {
        type :String
    },
    balancePrevBill : {
        type :Number,
        default : 0
    },
    totalCurrBill : {
        type :Number,
        default : 0
    },
    accountType : {
        type :String,
        required : true
    },
    billInfo : {
        type :Array
    },
    prevReading : {
        type :Number,
        default : 0
    },
    hasActiveBill : {
        type :Boolean,
        default : false
    },
    hasReqPayment : {
        type :Boolean,
        default : false
    },
    paidBillInfo : {
        type :Array
    }
},{ timestamps: true });



const User = mongoose.model("nwdUsers",userSchema); // table name should be small letters
module.exports = User;