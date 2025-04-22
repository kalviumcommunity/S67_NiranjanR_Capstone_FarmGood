const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('./../Models/userModel')
const auth = require('./../Middleware/auth')
require('dotenv').config({path:'./../config/.env'})

const secret = process.env.SECRET_KEY

userRouter.post("/sign-up", async(req,res)=>{
    const {profileName, email, password} = req.body;
    const userEmail = await userModel.findOne({email:email});
    if (userEmail) {
        return res.status(400).json({error: "User already exists"});
      }
    bcrypt.hash(password, 10, async (err, hash)=>{
        if (err){
            console.log(err)
            return res.status(500).json({error:"Internal server error."})
        }
        await userModel.create({
                profileName:profileName,
                email:email,
                password:hash,
        })
        console.log(hash);
        return res.status(200).json({message: "User created"});
    })
});

userRouter.post('/login',async (req,res)=>{
    try{
        const {email, password} = req.body;
    const user = await userModel.findOne({email:email});
    if(!user){
        return res.status(400).json({error:"User not found"});
    }
    const isMatch=await bcrypt.compare(password, user.password) 
        
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    const token = jwt.sign({id:user._id},secret,{expiresIn:'7d'})
    res.cookie('token',`Bearer ${token}`)
    return res.status(200).json({ message: `Login successful.`,email:email});
    }
    catch(err){
        console.error("Login error:", err.message, err.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
})

userRouter.get('/get-user',auth,async (req,res)=>{
    try
    {const user = req.user
    if (!user){
        return res.status(400).json({error:"User not found."})
    }
    return res.status(200).json({user:user})}
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})

userRouter.put('/edit-name',auth,async (req,res)=>{
    const id = req.user._id;
    const {profileName} = req.body;
    try
    {const user = await userModel.findById(id)
    if (!user){
        return res.status(400).json({error:"User not found."})
    }
    if (!profileName){
        return res.status(400).json({error:"Provide a Profile Name!"})
    }
    user.profileName = profileName;
    await user.save();
    return res.status(200).json({message:"User updated",user:user})}
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = userRouter