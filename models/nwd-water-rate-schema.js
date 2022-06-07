const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const waterRateSchme = new Schema({
    residence : {
        type : Number,
        required : true,
        default : 0
    },
    commercial : {
        type :Number,
        required : true,
        default : 0
    }
},{ timestamps: true });



const WaterRate = mongoose.model("waterRate",waterRateSchme); // table name should be small letters
module.exports = WaterRate;