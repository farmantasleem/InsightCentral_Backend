const express=require("express");
const bcrypt=require("bcryptjs");
const { Usermodel } = require("../models/user.model");
const userRoute=express.Router();
const JWT=require("jsonwebtoken")

//Sign Up

userRoute.post("/signup",async(req,res)=>{
    const {email,password,name}=req.body;
    if(email&&password&&name){                             //validating fields
    const hashedPassword=await bcrypt.hash(password,12)   //hashing password
        try{
            const newUser=await Usermodel({...req.body,password:hashedPassword})
            await newUser.save();                              //saving user in database
            res.status(200).send({msg:"Account Created Successfully"})

        }catch(err){
            res.status(500).send({msg:err.message})
        }

    }else{
        res.status(400).send({msg:"Validation Failed"})
    }
})


//Login

userRoute.post("/login",async(req,res)=>{
    const {email,password}= req.body
    if(email&&password){
        try{
            const userDetails=await Usermodel.findOne({email});
            
            const isMatch=await bcrypt.compare(password,userDetails.password);
            if(isMatch){
                const token=await JWT.sign({userid:userDetails._id},process.env.JWT_SECRET)
                res.status(200).send({msg:"Success",token})
            }else{
                res.status(404).send({msg:"Authentication Failed"})
            }


        }catch(err){
            res.status(404).send({msg:err.message})
        }

    }else{
        res.status(404).send({msg:"All fields are required"})
    }
})

module.exports={userRoute}