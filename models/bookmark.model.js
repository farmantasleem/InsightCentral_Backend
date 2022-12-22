const mongoose=require("mongoose");

const bookmarkSchema=mongoose.Schema({
    blog:{type:mongoose.Types.ObjectId,ref:'blog',required:true},
    by:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})


const Bookmarkmodel=mongoose.model("follower",bookmarkSchema);

module.exports={Bookmarkmodel}