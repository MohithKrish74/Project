//import express
const express = require("express")
const app = express()

//import dotenv
require("dotenv").config() 

//import path
const path = require("path")
app.use(express.static(path.join(__dirname,"dist/Frontend")))
//import mongoose
const mongoose = require("mongoose")
const dbConnectionUrl = process.env.DB_CONNECTION_URL

//import apis
const userApi = require("./APIS/userApi")
const adminApi = require("./APIS/adminApi")
const seatApi = require("./APIS/seatApi")

//connect mongoose
mongoose.connect(dbConnectionUrl)
.then(()=>{console.log("DB connection established...")})
.catch(error=>{console.log("Error",error.message)})

//execute api based on match
app.use("/user",userApi)
app.use("/admin",adminApi)
app.use("/seat",seatApi)

//default path loading
app.get("*",(request,response,)=>{
    response.sendFile(path.join(__dirname,"dist/Frontend/index.html"))
})

//assign port
const PORT = process.env.PORT
app.listen(PORT,()=>{console.log(`Server is actively watching on ${PORT}...`)})