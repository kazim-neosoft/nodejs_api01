const dataModel = require('../models/dataModel');
const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');// to hash the data
const jwt=require('jsonwebtoken');
require('dotenv').config();

const getProducts=async(req,res)=>{
    try {
        let data = await dataModel.find({})
        res.status(200).json({message:"all products",data:data});

    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
    
}

const addProduct=async(req,res)=>{

    try {
        const {name,city} = req.body;
        data = new dataModel({
            name,
            city
        });
        let savedData= await data.save();
        res.status(201).json({message:"add product",data:savedData});
    } 
    catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getProductById=async(req,res)=>{
    try {
        const {id}=req.params;
        let data = await dataModel.findById(id);
        res.status(200).json({data});
        
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const bodyData=req.body;
        await dataModel.findByIdAndUpdate(id,bodyData,{new:true});
        res.status(200).json({message:"Data Updated"});
        
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

const deleteProduct=async(req,res)=>{
    try {

        const {id}=req.params;
        await dataModel.findByIdAndDelete(id);
        res.status(200).json({message:"Data Deleted"});
        
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

const signIn=async(req,res)=>{
    try {
        const {username,password}=req.body;
        let data = await userModel.findOne({username});
        if(data){
            if(bcrypt.compareSync(password,data.password)){//compare password with hashed password
                token=jwt.sign({userId:data._id,username:data.username},process.env.SECRET_KEY,{expiresIn:"1h"})
                return res.status(200).json({message:"Login Ssucees",_token:token});
            }
        res.status(401).json({message:"unauthorized user"});
    }
 } 
 catch (error) {
    console.log(error);
    res.status(400).json({message:"Something went wrong"});
        
    }
}


const signUp=async(req,res)=>{
    try {

        let {email,username,password}=req.body;
        let hashPassword=await bcrypt.hash(password,10);//hashing password with 10 salt round
        let user = await userModel.findOne({username});//getting user document in user variable
        if(!user){

            userData=new userModel({email,username,password:hashPassword});
            userData.save();
           return res.status(200).json({message:"USer Registered"});
        }
        else{
            return res.status(400).json({message:"USer already Registered"});

        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Something went wrong"});
    }
}

const access=(req,res)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Token was not Provided"})
        }
        else{
            const decodeToken=jwt.verify(token,process.env.SECRET_KEY)
            return res.status(200).json({userId:decodeToken.userId,username:decodeToken.username})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Invalid Token"})
    }
}

module.exports={
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    signIn,
    signUp,
    access
}