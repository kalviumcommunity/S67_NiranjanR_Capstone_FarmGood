const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs')
const userModel = require('./../Models/userModel')

userRouter.post("/sign-up", async(req,res)=>{
    const {profileName, email, password} = req.body;
    const userEmail = await userModel.findOne({email:email});
    if (userEmail) {
        return res.status(400).json({error: "User already exists"});
      }
    bcrypt.hash(password, 10, async (err, hash)=>{
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
        return new Error("User not found");
    }
    const isMatch=await bcrypt.compare(password, user.password) 
        
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    res.cookie('email',email,{maxAge:(1000*60*60*24*7)})
    return res.status(200).json({ message: `Login successful.`});
    }
    catch(err){
        console.error("Login error:", err.message, err.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = userRouter