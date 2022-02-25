//import jwt
const jsonWebToken = require("jsonwebtoken")
//import dotenv
require("dotenv").config()

//verify token
const verifyToken=(request,response,next)=>{
    let bearerToken = request.headers.authorization
    if(bearerToken==undefined){
        response.send({message:"Unauthorized requests"})
    }
    else{
        try{
            let token = bearerToken.split(" ")[1]
            jsonWebToken.verify(token,process.env.SECRET_KEY)
        }
        catch{
            next(new Error("Session expired!!!"))
        }
    }
}

//exports
module.exports = verifyToken