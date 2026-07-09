const User = require("../models/user-model");
const generateToken = require("../utils/generateToken")
const deleteUploadFile = require("../utils/delete-uploaded-file")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    try{
    const user = await User.create({
        ...req.body,
        role: "user",
        imageUrl: req.file?.filename
    })
    const token = generateToken(user)

    if(req.file){
        deleteUploadFile(req.file.filename)
    }
    res.status(201).json({
        status: "success",
        message: "User Created",
        token,
        data: { user }
    })
    }catch(error){
        res.status(400).json({
            status: "error",
            message: "Error: " + error.message
        })
    }
}

const signin = async (req,res) =>{
    try {
        
    const {email, password} = req.body;
    
    if(!email || !password)return res.status(400).json({status:"fail",message:"email and password required"});

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(400).json({status:"fail",message:"user not found"})
    }
    const comparePasswords = await bcrypt.compare(password,user.password)

    if(!comparePasswords){
        return res.status(400).json({status:"fail",message:"user not found"})
    }

    user.password = undefined

    const token = generateToken(user);
    res.status(200).json({
        status:"success",
        token,
        data:{user}
    })
    } catch (error) {
        res.status(400).json({
            status:"Error",
            message: error.message
        })
    }
}

module.exports = {signup, signin}