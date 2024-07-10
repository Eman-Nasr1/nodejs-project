 
const express= require('express');
const router=express.Router();
const {body}=require('express-validator'); 
const coursescontroller=require('../Controller/courses.controller.js');
const allowedto=require('../middleware/allowedto');
const verifytoken=require('../middleware/verifytoken');


router.get ('/api/courses/:courseid',coursescontroller.getsniglecource);



router.post('/api/courses',
[
body('title')
  .notEmpty()
  .withMessage("title is require")
  .isLength({min:2})
  .withMessage("title at least 2 char"),

 body('price')
 .notEmpty() 
 .withMessage("price is require")

],
coursescontroller.addcourse
)


router.patch('/api/courses/:courseid',coursescontroller.updatecourse);


router.delete('/api/courses/:courseid',verifytoken,allowedto("admin","manger"),coursescontroller.deletecourse);

module.exports=router;