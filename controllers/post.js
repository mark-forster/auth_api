const Post=require('../models/post');


const getAllposts=async(req,res)=>{
            res.json({message:"All Post is Here"});
}

const createNewPost=async(req,res)=>{
        res.status(200).json({message:"Product Add Page"});
}

module.exports={
        getAllposts,
        createNewPost
}