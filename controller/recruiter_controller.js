const  db =require('../model');

const registered_recruiters = db.register_recruiter_model;
const recruiter_jobpost = db.recruiter_jobpost_model;
const applied_jobs = db.Applied_jobs;
const  registered_employee_data_model = db.register_employee_model;

const {auth_recruiter_register,auth_recruiter_update, auth_recruiter_jobpost} = require('../validator/recruiter_auth_models');

//import bcrypt encrypt the password
const bcrypt = require('bcrypt');

//import passport 

const passport = require('passport');
require('../config/local_passport_recruiter');

const jwt = require('jsonwebtoken');

//add recruiter

exports.register_recruiter_model = async (req,res)=>{
  try{
    const valid = await auth_recruiter_register.validateAsync(req.body);
    const encryptpassword = await bcrypt.hash(valid.password,10);
    const details = {
        id:Math.random().toString().substr(2,8),
        company_name:valid.company_name,
        email:valid.email,
        industry_experience:valid.industry_experience,
        technologys:valid.technologys,
        mobile_number:valid.mobile_number,
        company_website:valid.company_website,
        password:encryptpassword
    }
    registered_recruiters.create(details).then((data)=>{
        return res.status(200).send({
            status:200,
            message:"recruiter is registered",
            data:data,
            token:jwt.sign({id:data.id},
                "SECRETKEY12345",{
                    expiresIn:"60m",
                })
        })
    })
  }
  catch(error){
      return res.status(401).send({
          status:401,
          message:"there is some error in the field",
          err:error
      })
  }
}

//update the recuriter_details

exports.register_recruiter_update = async (req,res)=>{
    try{
      const valid = await auth_recruiter_update.validateAsync(req.body);
     const details = {
          company_name:valid.company_name,
          email:valid.email,
          industry_experience:valid.industry_experience,
          technologys:valid.technologys,
          mobile_number:valid.mobile_number,
          company_website:valid.company_website,
      }
      registered_recruiters.update(details,{where:{id:id.id}});
          return res.status(200).send({
              status:200,
              message:"recruiter is updated",
              data:details
          })
      
    }
    catch(error){
        return res.status(401).send({
            status:401,
            message:"there is some error in the updation",
            err:error
        })
    }
  }


  //delete the recruiter account from the database

  module.exports.delete_recruiter = async (req,res)=>{
    try{
    const details = await registered_recruiters.destroy({where:{id:req.params.id}})
    return res.status(200).send({
        status:200,
        data:details,
        message:"recuriter account is deleted",
        
    })
      }
    catch(error){
     return res.status(400).send({
            status:400,
            message:"there is some error",
            error:error.message
          })
      }
  }

  module.exports.jobposts = async (req,res)=>{
      try{
    const valid = await auth_recruiter_jobpost.validateAsync(req.body);
    const details = {
        job_role:valid.job_role,
    experience:valid.experience,
    skills:valid.skills,
    job_location:valid.job_location,
    package:valid.package,
    job_type:valid.job_type,
    job_id:Math.random().toString().substr(2,8),
    id:id.id,
    }
    recruiter_jobpost.create(details).then((data)=>{
        return res.status(200).send({
            status:200,
            message:"job is posted",
            data:data
        })
    
    })
}
catch(error){
    return res.status(400).send({
        status:200,
        message:"there is some error",
        error:error
      })
}
  }

module.exports.updatejobpost = async (req,res)=>{
    try{
        const valid = await auth_recruiter_jobpost.validateAsync(req.body);
        const details = {
            job_role:valid.job_role,
        experience:valid.experience,
        skills:valid.skills,
        job_location:valid.job_location,
        package:valid.package,
        job_type:valid.job_type,
        }
        recruiter_jobpost.update(details,{where:{job_id:req.params.job_id}});
        return res.status(200).send({
                status:200,
                message:"jobpost is updated",
                details:details,
            })
    }
    catch(error){
        return res.status(400).send({
            status:200,
            message:"there is some error",
            error:error
          })
    }
}

module.exports.deletejobpost = async (req,res)=>{
    try{
       const details = await recruiter_jobpost.destroy({where:{job_id:req.params.job_id}});
        return res.status(200).send({
                status:200,
                message:"jobpost is deleted",
                details:details,
            })
    }
    catch(error){
        return res.status(400).send({
            status:200,
            message:"there is some error",
            error:error
          })
    }
}

//show posted jobs by single recruiter

module.exports.postedjobs = async (req,res)=>{
    try{
        const details = await recruiter_jobpost.findAll({where:{id:id.id}});
        return res.send({
            status:200,
            data:details,
            message:"posted jobs",
        })
    }
    catch(error){
        return res.send({
            status:400,
            message:"there is some error",
            error:error,
        })
    }
}


//show all jobs  in single list


module.exports.alljobs = async(req,res)=>{
    try{
    const details = await recruiter_jobpost.findAll();
    return res.status(200).send({
        status:200,
        message:"list of allthe jobs",
        data:details,
        
    })
}
catch(error){
    return res.status(400).send({
        status:400,
        message:"there is some error",
        error:error
    })
}
}
//login for recruiter  
exports.reclogin = async(req,res,next)=>{
    passport.authenticate('local-recuriter',(err,user,info)=>{
        if(err) res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({id:user.id},
              "SECRETKEY12345",{
                  expiresIn:"60m",
              }),
            data:user,
        }) 
        if(info) return res.status(401).json(info)
    })(req,res,next);
  }

//jobseskers list api 

exports.jobseekers = async (req,res)=>{
    try{
    const details = await applied_jobs.findAll({where:{recruiter_id:id.id},
        include: await registered_employee_data_model});
    return res.status(200).send({
        status:200,
        message:"all the job seekers",
        data:details
    })
}
catch(error){
    return res.status(404).send({
        status:400,
        message:"there is some error",
        error:error
    })
}
}

//profile api of recuriter
exports.fulldetailsrecruiter = async (req, res) => {
    try {
      const details = await registered_recruiters.findAll({
        where: { id: id.id }
      });
      return res.status(200).send({
        status: 200,
        message: "full details of Recruiter",
        data: details,
      });
    } catch (error) {
      return res.status(401).send({
        status: 401,
        messgae: "there is some error",
        error: error,
      });
    }
  };