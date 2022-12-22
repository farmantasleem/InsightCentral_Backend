const express=require("express");

const { Authentication } = require("../middlewares/Authentication");
const { Followermodel } = require("../models/follower.model");

const followerRoute=express.Router();

//Getting Followers count;

followerRoute.get("/count/:author",async(req,res)=>{
    const author=req.params.author
    try{
        const count=await Followermodel.countDocuments({author:author})
        res.send(200).send({count:count})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Followers data

followerRoute.get("/:author",async(req,res)=>{
    const author=req.params.author
    try{
        const followerData=await Followermodel.find({author:author}).populate("by")        //populating all followers
        res.send(200).send(followerData)
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

//Unfollow any author

followerRoute.delete("/:author",Authentication,async(req,res)=>{
    const author=req.params.author;
    const userid=req.body.userid
    try{
        const followerData=await Followermodel.findOne({author:author})
        if(followerData&&followerData.by==userid){
            await Followermodel.findOneAndDelete({author:author,by:userid});
            res.status(200).send({msg:"Unfollow Success"})
        }else{
            res.status(404).send({msg:"Not Authenticated"})
        }
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports={followerRoute}