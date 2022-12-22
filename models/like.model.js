const mongoose=require("mongoose");

const likeSchema=mongoose.Schema({
    blog:{type:mongoose.Types.ObjectId,ref:'blog',required:true},
    by:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})


const Likemodel=mongoose.model("like",likeSchema);

module.exports={Likemodel}