const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config(
    {path: "../Config/.env"}
);

const auth = async(req,res,next)=>{
    let token;
    if(req.cookies.token && req.cookies.token.startsWith("Bearer")){
        token = req.cookies.token.split(" ")[1];
    }
    else if (req.cookies.token){
        token = req.cookies.token
    }
    if(!token){
        return res.status(400).json({error:'Login to access this resource!'})
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userModel.findById(decoded.id);
        console.log(req.user)
        next();
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = auth;