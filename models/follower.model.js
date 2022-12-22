const mongoose=require("mongoose");

const followerSchema=mongoose.Schema({
    author:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    by:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})


const Followermodel=mongoose.model("follower",followerSchema);

module.exports={Followermodel}