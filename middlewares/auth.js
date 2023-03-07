const jwt=require('jsonwebtoken');

require('dotenv').config();
const verifyToken=async (req,res,next)=>{
        const authheader=req.headers['authorization'];
        if(!authheader){
            res.status(402).json({message:"Error Message"});
        }
        const [type,token]=authheader.split(" ");
        if(type !=="Bearer") return res.status(401).json({message:"A token is required for authentication"});
        try{
            const decoded=jwt.verify(token,process.env.JWT_Key);
            req.user = decoded;
            next();

        }
        catch(err){
            res.status(401).json({message:"Invalid Token of this"});
        }
}

module.exports=verifyToken;