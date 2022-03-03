//import mini express
const express = require("express")
const seatApp = express.Router()

//body parser middleware
seatApp.use(express.json())

//import Seat model
const Seat = require("../models/Seat")

//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//provide route

//get seat using seat number
seatApp.get("/getseat/:seatNumber",expressAsyncHandler(async(request,response)=>{
    //get seatNumber selected by user
    let seatNumberSelectedByUser = request.params.seatNumber
    //check for existence in DB
    let seatInDb = await Seat.findOne({seatNumber:seatNumberSelectedByUser})
    //if available
    if(seatInDb!==null){
        response.send({message:"Seat Found",payload:seatInDb})
    }
    else{
        response.send({message:"Seat not available"})
    }
}))

//gret all seats in theatre
seatApp.get("/getallseats",expressAsyncHandler(async(request,response)=>{
    //get all seats
    let seatAvailable = await Seat.find({})
    //send info
    response.send({message:"Seats In Theatre",payload:seatAvailable})
}))

//create seat
seatApp.post("/createseat",expressAsyncHandler(async(request,response)=>{
    //get the new seat
    let newSeat = request.body
    //get name of new seat
    let nameOfNewSeat = newSeat.seatNumber
    //check for new seat existence
    let seatInDb = await Seat.findOne({seatNumber:nameOfNewSeat})
    //if null add
    if(seatInDb==null){
        //create a seat doc
        let seatDoc = new Seat({...newSeat})
        //save it in DB
        await seatDoc.save()
        //send info
        response.send({message:"Seat Added",payload:newSeat})
    }
    else{
        response.send({message:"Seat already exists"})
    }
}))

//update seat data
seatApp.put("/updateseat",expressAsyncHandler(async(request,response)=>{
    //get the updated seat
    let updatedSeat = request.body
    //get updated seat number
    let updatedSeatNumber = updatedSeat.seatNumber
    // find and update in db
    await Seat.findOneAndUpdate({seatNumber:updatedSeatNumber},{$set:{...updatedSeat}})
    //send info
    response.send({message:"Seat Updated",payload:updatedSeat})
}))











//path not match error
seatApp.use((request,response,next)=>{
    response.send({message:"Path not available"})
})

//error handling middleware
seatApp.use((error,request,response,next)=>{
    response.send({message:"Error",payload:error.message})
})

//export
module.exports = seatApp