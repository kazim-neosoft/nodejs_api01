const express=require('express');
const mongoose=require('mongoose');
const router = require('./routes/productRoute');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT;

const MONGODB_URI=process.env.MONGODBATLAS_URI;
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(MONGODB_URI)
.then(res=> console.log("DB CONNECTED"))
.catch(err=>console.log(err));


app.use("/api",router);
app.use("*",(req,res)=>{
    res.status(404).json({message:"Invalid Endpoint"});
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on port ${PORT}`);
})

