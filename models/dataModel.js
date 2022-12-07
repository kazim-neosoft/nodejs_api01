const mongoose=require('mongoose');

const dataModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("data",dataModel);