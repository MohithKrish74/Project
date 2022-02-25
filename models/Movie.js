//import mongoose
const mongoose = require("mongoose")

//create a schema
const movieSchema = new mongoose.Schema({
    username:{type:String},
    movieList:{type:Array}
})
//create a model
const movieModel = mongoose.model('moviecollection',movieSchema)

//export
module.exports = movieModel