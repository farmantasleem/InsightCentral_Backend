const JWT=require("jsonwebtoken");
const { Usermodel } = require("../models/user.model");


const AdminAuthentication=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    if(token.length>1){
        const decoded=await JWT.verify(token,process.env.JWT_SECRET);  //token verification 
        if(decoded){
            const userid=decoded.userid;  //user id after decoding token
            try{
                const userData=await Usermodel.findOne({_id:userid});  //finding data of user by id
                if(userData && Object.keys(userData).length>0){
                    if(userData.role=="admin"){                        //checking is user admin or not
                        next()                                         
                    }else{
                        res.status(400).send({msg:"User is not Authenticated"})
                    }

                }else{
                    res.status(400).send({msg:"User is not Authenticated"})
                }

            }catch(err){
                res.status(500).send({"msg":err.message})
            }

           
        }else{
            res.status(400).send({msg:"Token Expired"})
        }

    }else{
        res.status(400).send({msg:"User is not Authenticated"})
    }
}

module.exports={AdminAuthentication}