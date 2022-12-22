const express=require("express");
const { Authentication } = require("../middlewares/Authentication");
const { Bookmarkmodel } = require("../models/bookmark.model");

const bookmarkRoute=express.Router();

//Getting Bookmarks of specific User

bookmarkRoute.get("/",Authentication,async(req,res)=>{
    const userid=req.body.userid;

    try{
        const bookmarkData=await Bookmarkmodel.find({by:userid}).populate("blog");      //populating Blog 
        res.status(200).send(bookmarkData)

    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//adding Bookmark

bookmarkRoute.post("/:blogid",Authentication,async(req,res)=>{
    const userid=req.body.userid;
    const blog=req.params.blogid;

    try{
        const newBookmark=await Bookmarkmodel({blog:blog,by:userid})
        await newBookmark.save();
        res.status(200).send({msg:"Added to bookmark"})

    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Deleting BookMark

bookmarkRoute.delete("/:bookmarkid",Authentication,async(req,res)=>{
    const userid=req.body.userid;
    const bookmark=req.params.bookmarkid;

    try{
        await Bookmarkmodel.findOneAndDelete({_id:bookmark,by:userid})
        res.status(200).send({msg:"Deleted Successfully"})

    }catch(err){
        res.status(500).send({msg:err.message})
    }
})
module.exports={bookmarkRoute}