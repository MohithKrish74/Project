//import mini express
const express = require("express")
const adminApp = express.Router()

//body parser middleware
adminApp.use(express.json())

//import admin model
const Admin = require("../models/Admin")

//import movie model
const Movie = require("../models/Movie")

//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//import dotenv
require("dotenv").config()

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import jsonwebtoken
const jsonwebtoken = require("jsonwebtoken")

//import cloudinary
var cloudinary = require("cloudinary").v2; 

//import multer-storage-cloudinary
const { CloudinaryStorage }=require("multer-storage-cloudinary")

//import multer
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(request,file)=>{
        return{
            folder:process.env.FOLDER,
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

const upload = multer({storage:storage})
//provide route

//Movie section

//getting movies from admin
adminApp.get("/getmovies",expressAsyncHandler(async(request,response)=>{
    //get movies by admin
    const adminInfo = await Movie.findOne({username:process.env.ADMIN})
    //get movie list
    const movieList = adminInfo.movieList
    //get movie with status as false
    const movieAvailable = movieList.filter(movieObj=>movieObj.status==false)
    //send info
    response.send({message:"Movie List",payload:movieAvailable})
}))


//get movie using moviename
adminApp.get("/getmovie/:movieName",expressAsyncHandler(async(request,response)=>{
    //get movie name from user
    let movieName = request.params.movieName
    //search for admin in DB
    let adminInfo = await Movie.findOne({username:process.env.ADMIN})
    //get all movies
    let movies = adminInfo.movieList
    //get movie of user choice
    let movie = movies.find(movieObj=>movieObj.movieName==movieName)
    //send info
    response.send({message:"Movie Found",payload:movie})

}))

//add movies
adminApp.post("/addmovie",upload.single("photo"),expressAsyncHandler(async(request,response)=>{
    //image url from cloudinary
    let imgCdn = request.file.path
    //get movie from admin
    const movieAddedByAdmin = JSON.parse(request.body.movieObj) 
    //check movie existed 
    const adminInfo = await Movie.findOne({username:process.env.ADMIN})
    // const moviesAvailable = adminInfo.movieList
    if(adminInfo==null){
        let movieDoc = new Movie({...movieAddedByAdmin})
        let newMovie = await movieDoc.save()
        response.send({message:"Admin Created"})
    }
    else{
        //get info
        let updatedMovies = adminInfo
        //add img
        movieAddedByAdmin.movieList[0].img = imgCdn
       // console.log("list",movieList)
        //add movies 
        updatedMovies.movieList.push(movieAddedByAdmin.movieList[0])
        //update movies in admin section
        await Movie.updateOne({username:process.env.ADMIN},updatedMovies)
        response.send({message:"Movie Added"})
    }
}))

//remove movies
adminApp.put("/removemovie",expressAsyncHandler(async(request,response)=>{
    //get movie name
    let movieNameToRemove = request.body.movieName
    //check for existence
    let movieDetailsInDb = await Movie.findOne({username:process.env.ADMIN})
    //if not null
    if(movieDetailsInDb!==null){
        //get movies available
        let moviesAvailable = movieDetailsInDb.movieList
        //find movie of admin selected
        let adminSelectedMovie = moviesAvailable.find(movieObj=>movieObj.movieName==movieNameToRemove)
        //update the status
        adminSelectedMovie.status=true
        //update
        await  Movie.findOneAndUpdate({username:process.env.ADMIN},{$set:{movieList:moviesAvailable}})
        response.send({message:"Movie Deleted"})
    }
}))


//Admin section

//create admin
adminApp.post("/createadmin",expressAsyncHandler(async(request,response)=>{
    //get admin data
    const adminData = request.body
    //get password and hash
    let hashedPassword = await bcryptjs.hash(adminData.password,5)
    adminData.password = hashedPassword
    //create admin doc
    const adminDoc = new Admin({...adminData})
    //save
    adminDoc.save()
    //send info
    response.send({message:"Admin Created",payload:adminDoc})

}))

//login admin
adminApp.post("/login",expressAsyncHandler(async(request,response)=>{
    //get login credentials from user
    let adminCredentials = request.body
    //check for username in DB
    let adminDataInDb = await Admin.findOne({username:adminCredentials.username})
    //if it is null
    if(adminDataInDb==null){
        response.send({message:"Invalid Username"})
    }
    else{
        //verify password 
        let result = await bcryptjs.compare(adminCredentials.password,adminDataInDb.password)
        if(result==false){
            response.send({message:"Invalid Password"})
        }
        else{
            //create a signed token
            let signedToken = jsonwebtoken.sign({username:adminDataInDb.username},process.env.SECRET_KEY,{expiresIn:100})
            //send info
            response.send({message:"Login Successful",token:signedToken,admin:adminDataInDb})

        }
    }
}))





//path not match error
adminApp.use((request,response,next)=>{
    response.send({message:"Path not available"})
})

//error handling middleware
adminApp.use((error,request,response,next)=>{
    response.send({message:"Error",payload:error.message})
})

//export
module.exports = adminApp