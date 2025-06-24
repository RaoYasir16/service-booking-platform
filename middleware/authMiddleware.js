const jwt = require("jsonwebtoken");
const{User} = require("../models");

//...........Authanticate The User by JsonWebToken........//
const authMiddleware = async(req , res, next)=>{
   try {
    let token;
    if(req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            message:"Not Authorize, Token Missing"
        });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next()       
   } catch (error) {
    return res.status(500).json({
        message:error.message
    })
   }
}


//.................Authanticate the Role..............//
const authorizeRole = function authorizeRole(...allowedRoles){
    return(req,res,next)=>{
        const user = req.user
        if(!user || !allowedRoles.includes(user.role)){
            return res.status(401).json({
                message:"Access Denied. You don't have permission to Perform this action"
            })
        }
        
        next()
    }
}

module.exports = {authMiddleware,authorizeRole}