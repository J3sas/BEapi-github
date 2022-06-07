const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ecommProduct = new Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    description : {
        type : Array,
        default : []
    },
    imageSource : {
        type : String,
        required : true,
        default : ''
    },
    ownerId : {
        type : String,
        required : true
    }
},{ timestamps: true });



const EcommProducts = mongoose.model("ecommProducts",ecommProduct); // table name should be small letters
module.exports = EcommProducts;