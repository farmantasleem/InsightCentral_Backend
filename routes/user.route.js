const express=require("express");
const bcrypt=require("bcryptjs");
const { Usermodel } = require("../models/user.model");
const userRoute=express.Router();
const JWT=require("jsonwebtoken");
const { Authentication } = require("../middlewares/Authentication");
const { Blogmodel } = require("../models/blog.model");
const { AutoEncryptionLoggerLevel } = require("mongodb");

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
            if(userDetails?.name.length>0){
            const isMatch=await bcrypt.compare(password,userDetails.password);
            if(isMatch){
                const token=await JWT.sign({userid:userDetails._id},"NOTHINGISSECRET")
                res.status(200).send({msg:"Success",token,data:userDetails})
            }else{
                res.status(404).send({msg:"Authentication Failed"})
            }}else{
                res.status(404).send({msg:"account not found"})
            }


        }catch(err){
            res.status(404).send({msg:err.message})
        }

    }else{
        res.status(404).send({msg:"All fields are required"})
    }
})

//User all blog

userRoute.get("/myblog",Authentication,async(req,res)=>{
    const userid=req.body.userid
    try{
        const myBlog=await Blogmodel.find({author:userid}) 
        res.status(200).send(myBlog)
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Update userinfo;

userRoute.patch("/user",Authentication,async(req,res)=>{
    const userid=req.body.userid;

    try{
        await Usermodel.findOneAndUpdate({_id:userid},{...req.body})
        res.status(200).send({msg:"Updated Successfully"})
    }
    catch(err){
        res.status(200).send({msg:err.message})
    }
})

//profile page

userRoute.get("/profile",Authentication,async(req,res)=>{
    const userid=req.body.userid;
    try{
        const userDetails=await Usermodel.findOne({_id:userid});
        res.status(200).send(userDetails)
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

userRoute.get("/author/:id",async(req,res)=>{
    const userid=req.params.id;
    try{
        const userDetails=await Usermodel.findOne({_id:userid});
        res.status(200).send({"img":userDetails.img,"bio":userDetails.bio,"author":userDetails.name})
    }catch(err){
        res.status(400).send({err:err.message})
    }
})
module.exports={userRoute}