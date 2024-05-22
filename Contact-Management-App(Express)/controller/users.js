const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exist")
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
    });
    console.log(`User created: ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({message: "Register the user"});
})

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable && (await bcrypt.compare(password, userAvailable.password))){
        const accessToken = jwt.sign({
            user:{
                username: userAvailable.username,
                email: userAvailable.email,
                id: userAvailable.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Wrong credentials")
    }
})

const currentUser = asyncHandler (async (req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser}