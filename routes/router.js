const express = require('express');

const approuter = express.Router();

const controller  = require('../controller/controller');
const image = require('../controller/profile_upload');

const verify = require('../middleware/JWTverfiytoken,');
const passport = require('passport');

//reuire googlepassport file

require('../config/google-passport');



approuter.post('/register_emp',controller.register_employee);
approuter.post('/register_details',verify.verfiytoken,controller.registered_employee_details);
approuter.post('/register_upload',verify.verfiytoken,image.single('profile_pic'),controller.registered_employee_data);
approuter.post('/login',passport.authenticate('local-employee'),controller.userlogin);

//update the registers_employee
approuter.put('/update/register_emp',verify.verfiytoken,controller.update_employee);
approuter.put('/update/employee_details',verify.verfiytoken,controller.update_employee_details);

//delete the user api 
approuter.delete("/delete/employee",verify.verfiytoken,controller.delete_employee);

//profile details get 

approuter.get('/profile',verify.verfiytoken,controller.fulldetails);
//exports the approuter from file


//applied job api 

approuter.post('/applied/jobs',verify.verfiytoken,controller.appliedjobs);

//applied of user
approuter.get('/all_applied_jobs',verify.verfiytoken,controller.userappliedjobs);

//login with google api 


approuter.get('/auth/google',passport.authenticate('google',{scope:['profile']}))

approuter.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),function(req,res){
    console.log(req.isAuthenticated());
     return res.status(200).send({
         status:200,
         data:req.user,
         message:"data is collected"
     })
})

approuter.get('/display',verify.verfiytoken,controller.display);

module.exports = approuter;