const {User} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


//..........Register User......//
const register = async(req , res)=>{
    try {
        const {name,email,password,role} = req.body;
        
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({
                message:"Email already Register"
            });
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role
        });

        return res.status(200).json({
            message:"User Register Successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//...........Login User.......//
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(400).json({
                message:"Email not Regiser"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Email or Password Incorrect"
            });
        }

        const token = generateToken(user.id,user.role);

        return res.status(200).json({
            message:"User Login successfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                token
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {register,login}