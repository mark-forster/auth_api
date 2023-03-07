const User=require('../models/user');
const {userSchema,pwChange,loginV}=require('../validation/user');
//dotenv
require('dotenv').config();
//jsonwebtoken
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { default: mongoose } = require('mongoose');
const getAllUser=async (req,res)=>{
        res.status(200).json({message:"Get All User"});
}

const createNewUser=async (req,res)=>{
        try{
            //acception user input data
            const {name,email,password,confirmPassword}=req.body;
            //validating inputdata
            const validator=await userSchema.validateAsync(req.body);
            //validation user InputData
            if(!name || !email || !password || !confirmPassword){
                res.status(402).json({message:"All input field are required"});
            }
            const hashedPw=await bcrypt.hash(password,12);
            //checking old user
            const olduser=User.findOne({email:email})
            .then(olduser=>{
                if(olduser){
                    res.status(402).json({message:"Email Addres Already Exists"});
                }
                   
                    const user=new User({
                        name:name,
                        email:email,
                        password:hashedPw
                    });
                    user.save();
                  
                res.status(200).json({message:user});
            });
            
            
        }
        catch(err){
            res.status(402).json(err.message)
        }
}

const login=async (req,res)=>{
       try{
         //inputfield
         const {email,password}=req.body;
                 if(!email || !password){
                 res.status(402).json({message:"Invalid Email adderss or password"});
                 }
                 //validation input request
            const validator=await loginV.validateAsync(req.body);
                 const user=await User.findOne({email:email});
                 console.log(user);
                 if(user){
                      const checkingPw=await bcrypt.compare(password,user.password);
                         if(checkingPw){
                                 //creating Token
                                 const token=jwt.sign({email:email},process.env.JWT_Key,{expiresIn:process.env.JWT_EXPIRE});
                                 //saving token
                                 user.token= token;
                                 const resultUser={
                                     name:user.name,
                                     email:user.email,
                                     token:user.token
                                 }
                                 res.status(200).json({message:resultUser})
                         }
                         else{
                            res.status(402).json({message:"Password Does not Match"});
                         }
                         }
         }
    catch(err){
        res.status(402).json({message:err.message});
    }

}

const changePassword=async (req,res)=>{
        const id=new mongoose.Types.ObjectId(req.params.id);
        const {oldpassword,newpassword,confirmPassword}=req.body;
        try{
           const user=await User.findOne({_id:id});
           console.log(user.password);
           if(user){
            //validation input request
            const validator=await pwChange.validateAsync(req.body);
            //Matching Password
                const matchPassword=await bcrypt.compare(oldpassword,user.password);
                    if(matchPassword){
                        const user=await User.findByIdAndUpdate({_id:id},{$set:{
                            password:newpassword
                        }},{new:true});
                        res.status(200).json({message:'Password Change Successfully'});
                    }
                    else{
                        res.send("Old Password Does not Match");
                    }
               
                
           }
           else{
            res.status(401).json({message:"Invalid Email Address"});
           }
        }
        catch(err){
            res.status(401).json({message:err.message});
        }
       
};



module.exports={
        getAllUser,
        createNewUser,
        login,
        changePassword
}
