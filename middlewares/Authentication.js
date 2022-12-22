const JWT=require("jsonwebtoken")
const Authentication=async(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    if(token?.length>1){
        const decoded=await JWT.verify(token,process.env.JWT_SECRET);
        if(decoded){
            const userid=decoded.userid;
            req.body.userid=userid;
            next()
        }else{
            res.status(400).send({msg:"Token Expired"})
        }

    }else{
        res.status(400).send({msg:"User is not Authenticated"})
    }
}

module.exports={Authentication}