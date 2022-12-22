const express=require("express");
const { Likemodel } = require("../models/like.model");
const { Authentication } = require("../middlewares/Authentication");

const likeRoute=express.Router();

//Getting like count for specific blog
likeRoute.get("/count/:blog",async(req,res)=>{
    const blog=req.params.blog
    try{
        const count=await Likemodel.countDocuments({blog:blog})
        res.send(200).send({count:count})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Getting like data for specific blog
likeRoute.get("/:blog",async(req,res)=>{
    const blog=req.params.blog
    try{
        const dataLike=await Likemodel.find({blog:blog}).populate("by")
        res.send(200).send(dataLike)
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Unlike any Blog

likeRoute.delete("/:blog",Authentication,async(req,res)=>{
    const blog=req.params.blog;
    const userid=req.body.userid
    try{
        const likeData=await Likemodel.findOne({blog:blog,by:userid})
        if(likeData&&likeData.by==userid){
            await Likemodel.findOneAndDelete({blog:blog,by:userid});
            res.status(200).send({msg:"Unliked"})
        }else{
            res.status(404).send({msg:"Not Authenticated"})
        }
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports={likeRoute}