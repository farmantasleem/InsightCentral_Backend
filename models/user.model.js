const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    bio:{type:String,default:""},
    img:{type:String,default:"https://www.mymasala.in/wp-content/uploads/2022/05/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},

    
})


    

const Usermodel=mongoose.model("user",userSchema);

module.exports={Usermodel}