const {body,validationResult}=require('express-validator');

 const Course=require('../models/course.model');
 const httpstatustext=require('../utilits/httpstatustext');
const asyncwrapper=require('../middleware/asyncwrapper');
const AppError=require('../utilits/AppError');


 

const getallcourses =asyncwrapper(async(req,res)=>{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const skip=(page-1)*limit;

    const course= await Course.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpstatustext.SUCCESS,data:{course}});
})

const getsniglecource =asyncwrapper(async( req, res, next)=>{
    // console.log(req.params);
   
      const course=await Course.findById(req.params.courseid);
      if (!course) {
        // ('Course not found', 404, httpstatustext.FAIL);
        const error=AppError.create('Course not found', 404, httpstatustext.FAIL)
        return next(error);
    }
       return res.json({status:httpstatustext.SUCCESS,data:{course}});
}) 


const addcourse = asyncwrapper(async (req, res,next) => {
    // console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
        const error=AppError.create(errors.array(), 400,httpstatustext.FAIL)
        return next(error);
        // return res.status(400).json({status:httpstatustext.FAIL,data:errors.array()});
    }

    const newCourse = new Course(req.body); // Assuming Course is a model for courses
    await newCourse.save();
    res.json({status:httpstatustext.SUCCESS,data:{course:newCourse}});
})


 const updatecourse = asyncwrapper(async (req,res)=>{
    const courseId=req.params.courseid;
      const updatedcourse= await Course.updateOne({courseId},{$set: {...req.body}});
      return  res.status(200).json({status:httpstatustext.SUCCESS,data:{course:updatedcourse}})
})



const deletecourse= asyncwrapper(async(req,res)=>{
    await Course.deleteOne({_id:req.params.courseid});
   res.status(200).json({status:httpstatustext.SUCCESS,data:null});

})

module.exports={
    getallcourses,
    addcourse,
    getsniglecource,
    updatecourse,
    deletecourse

}