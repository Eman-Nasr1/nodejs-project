

const express= require('express');
const index=express();
const mongoose = require('mongoose');
const httpstatustext=require('./utilits/httpstatustext.js');
const path=require('path');

index.use('/uploads',express.static(path.join(__dirname,'uploads')))

const cors=require('cors');
require('dotenv').config();
const url=process.env.MONGO_URL

mongoose.connect(url).then(()=>{
    console.log("mongoose start");
})
index.use (express.json());
const rrouter=require('./Roautes/routes.js');
index.use('/',rrouter)

const userrouter=require('./Roautes/userroutes.js');
index.use('/',userrouter)
index.use(cors())



index.all('*',(req,res,next)=>{
    return res.status(400).json({status:httpstatustext.ERROR,message:"this resource is not aviliable"}) 
})



index.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statustext || httpstatustext.ERROR,
        message: error.message,
        code: error.statusCode,
        data: null
    });
//   res.json(next);
    
})


index.listen(process.env.PORT,()=>{
    console.log('listening on port : 4000');
})
