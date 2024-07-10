const express= require('express');
const router=express.Router();
const usercontroller=require('../Controller/user.controller');
const verifytoken=require('../middleware/verifytoken');
const AppError=require('../utilits/AppError');
const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  }
});
 


const fileFilter = (req, file, cb) => {
    const imgType = file.mimetype.split('/')[0];
    if (imgType === 'image') {
      cb(null, true);
    } else {
      cb(AppError.create('file must be img',400), false);
    }
  }

const upload = multer({ storage: diskStorage ,fileFilter });
 
router.get ('/api/users',verifytoken,usercontroller.getallusers);

router.post('/api/register',upload.single('avatar'),usercontroller.register);

router.post ('/api/login',usercontroller.login);


module.exports=router;