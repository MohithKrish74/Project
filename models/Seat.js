//import mongoose
const mongoose = require("mongoose")
//create a schema
const seatSchema = new mongoose.Schema({
    seatNumber:{type:String},
    isSeatSelected:{type:Boolean,default:false},
    isSeatBooked:{type:Boolean,default:false}
})
//create a model
const seatModel = mongoose.model("seatcollection",seatSchema)
//export
module.exports = seatModel