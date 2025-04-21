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
    res.cookie('email',email,{maxAge:(1000*60*60*24*7)})
    return res.status(200).json({ message: `Login successful.`,email:email});
    }
    catch(err){
        console.error("Login error:", err.message, err.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
})

userRouter.get('/get-user',async (req,res)=>{
    const email = req.cookies.email;
    if (!email){
        return res.status(400).json({message:"Email not found in cookies."})
    }
    try
    {const user = await userModel.findOne({email:email})
    if (!user){
        return res.status(400).json({error:"User not found."})
    }
    return res.status(200).json({user:user})}
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})

userRouter.put('/edit-name',async (req,res)=>{
    const email = req.cookies.email;
    const {profileName} = req.body;
    if (!email){
        return res.status(400).json({message:"Email not found in cookies."})
    }
    try
    {const user = await userModel.findOne({email:email})
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