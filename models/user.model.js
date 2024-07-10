const mongoose = require('mongoose');
const validator=require('validator');
const Userschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            validate:[validator.isEmail,'filed must be a vaild email address']
        },
        password:{
            type:String,
            required:true
        },
        token:{
            type:String
        },
        role:{
            type:String,
            enum:["user","admin","manger"],
            default:"user"
        },
        avatar:{
            type:String,
             default:'uploads/jyg1.jpg'
        }
         
    }
)

module.exports= mongoose.model('User',Userschema)