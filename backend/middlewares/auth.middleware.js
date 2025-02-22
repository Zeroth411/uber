
const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthenticated'})
    } 

    const isBlacklisted=await userModel.findOne({token: token });

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }



    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //decoded me vahi data ayega jo encrypt karna vkt ayega means id
        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();
    }
    catch(err){
        return res.status(401).json({message:'Unauthorized'})
    }

}