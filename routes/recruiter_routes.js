const express = require('express');
const passport = require('passport');

const approuter  = express.Router();

const controller = require('../controller/recruiter_controller');

const employetoken = require('../middleware/JWTverfiytoken,');

//import verify recruiter

const verfiytoken = require('../middleware/verify_recruiter_token');
approuter.post('/register/recruiter',controller.register_recruiter_model);

//update the recruiter details

approuter.put('/update/recruiter/:id',controller.register_recruiter_update);

//delete the recruiter
approuter.delete('/delete/recruiter/:id',controller.delete_recruiter);

approuter.post('/jobpost',verfiytoken.verfiytoken,controller.jobposts);

//update the job post 

approuter.put('/update/jobpost/:job_id',controller.updatejobpost);

//jobs posted by single recruiter

approuter.get('/postedjobs',verfiytoken.verfiytoken,controller.postedjobs);

//delete the single job post 


approuter.delete('/delete/jobpost/:job_id',controller.deletejobpost);


//list of all the users
approuter.get('/jobslist',employetoken.verfiytoken,controller.alljobs);

approuter.post('/login',passport.authenticate('local-recuriter'),controller.reclogin);

// jobseekers api 

approuter.get('/jobseekers',verfiytoken.verfiytoken,controller.jobseekers);


module.exports = approuter;