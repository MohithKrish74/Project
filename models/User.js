//import mongoose
const mongoose = require("mongoose")

//create a schema
const userSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    city:{type:String},
    age:{type:Number}
},{collection : 'usercollection'})

//create a model
const userModel = mongoose.model("user",userSchema)

//export model
module.exports = userModel