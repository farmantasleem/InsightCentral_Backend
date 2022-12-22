const mongoose=require("mongoose");

const commentSchema=mongoose.Schema({
    blog:{type:mongoose.Types.ObjectId,ref:'blog',required:true},
    comment:{type:String,required:true},
    by:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    date:{type:Date,default:Date.now()}
})


const Commentmodel=mongoose.model("comment",commentSchema);

module.exports={Commentmodel}