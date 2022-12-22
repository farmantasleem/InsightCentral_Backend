const express=require("express");
const { Authentication } = require("../middlewares/Authentication");
const { Commentmodel } = require("../models/comment.model");

const commentRoute=express.Router();

//Get Comments for specific blog

commentRoute.get("/:id",async(req,res)=>{
    const blogid=req.params.id;
    try{
        const getComment=await Commentmodel.find({blog:blogid}).populate("by")       //populating user who commented
        res.status(200).send(getComment)
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Adding Comment

commentRoute.post("/:id",Authentication,async(req,res)=>{
    const blogid=req.params.id;
    const userid=req.body.userid
    const {comment}=req.body
    if(comment){
        try{
            const newBlog=await Commentmodel({...req.body,blog:blogid,by:userid})
            await newBlog.save();
            res.status(200).send({msg:'Comment Added'})
            
        }catch(err){
            res.status(500).send({msg:err.message})
        }
    }else{
        res.status(404).send({msg:"Empty Comment"})
    }
    
})

//Updating Comment
commentRoute.patch("/:id",Authentication,async(req,res)=>{
    const blogid=req.params.id;
    const userid=req.body.userid

        try{
            const blogOne=await Commentmodel.findOne({blog:blogid,by:userid});
            if(blogOne&&blogOne.by==userid){
                await Commentmodel.findOneAndUpdate({blog:blogid,by:userid},{...req.body})
                res.status(200).send({msg:'Comment Updated'})
            }else{
                res.status(404).send({msg:'Not Authenticated'})
            }
           
        
        }catch(err){
            res.status(500).send({msg:err.message})
        }
    
})


//deleting Comment

commentRoute.delete("/:id",Authentication,async(req,res)=>{
    const blogid=req.params.id;
    const userid=req.body.userid

        try{
            const blogOne=await Commentmodel.findOne({blog:blogid,by:userid});
            if(blogOne&&blogOne.by==userid){
                await Commentmodel.findOneAndDelete({blog:blogid,by:userid})
                res.status(200).send({msg:'Comment Deleted'})
            }else{
                res.status(404).send({msg:'Not Authenticated'})
            }
           
        
        }catch(err){
            res.status(500).send({msg:err.message})
        }
    
})

module.exports={commentRoute}