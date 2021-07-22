//import validator file from validator folder

const {
  auth_employee_register,
  auth_employee_register_details,
  update_employee,
  auth_applied_jobs
} = require("../validator/auth_models");

//import model index file from model folder

const db = require("../model");
///import lodash

//import bcrypt for password ecryption

const bcrypt = require("bcrypt");
//salt rounds

const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../config/passport_local.js");
const registerd_employees = db.register_employee_model;
const registered_employee_details = db.register_employee_details;
const registered_employee_data_model = db.register_employee_data_model;
const applied_jobs = db.Applied_jobs;

exports.register_employee = async (req, res) => {
  try {
    const valid = await auth_employee_register.validateAsync(req.body);
    const enccryptedpassword = await bcrypt.hash(valid.password, 10);
    const user = {
      email: valid.email,
      first_name: valid.first_name,
      last_name: valid.last_name,
      gender: valid.gender,
      password: enccryptedpassword,
    };
    registerd_employees.create(user).then((data) => {
      return res.status(200).send({
        status: 200,
        data: data,
        message: "User is registered Successfully",
        token: jwt.sign({ id: data.id }, "SECRETKEY007", {
          expiresIn: "60m",
        }),
      });
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some error in registered",
      error: error.message,
    });
  }
};

exports.registered_employee_details = async (req, res) => {
  try {
    const valid = await auth_employee_register_details.validateAsync(req.body);
    const details = {
      id: id.id,
      contact: valid.contact,
      nationality: valid.nationality,
      state: valid.state,
      hometown: valid.hometown,
      currentlocation: valid.currentlocation,
      qualification: valid.qualification,
      experience: valid.experience,
      technologys: valid.technologys,
    };
    registered_employee_details.create(details).then((data) => {
      return res.status(200).send({
        status: 200,
        data: data,
        message: "details is registered Successfully",
      });
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some error to registered details",
      error: error.message,
    });
  }
};

exports.registered_employee_data = (req, res) => {
  try {
    const details = {
      id: id.id,
      profile_pic: req.file.filename,
    };
    registered_employee_data_model.create(details).then((data) => {
      return res.status(200).send({
        status: 200,
        data: data,
        message: "data is uploaded",
      });
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some error to to upload the data",
      error: error.message,
    });
  }
};

exports.userlogin = async (req, res, next) => {
  passport.authenticate('local-employee', (err, user, info) => {
    if (err) res.status(404).json(err);
    if (user)
      return res.status(200).json({
        token: jwt.sign({ id: user.id }, "SECRETKEY007", {
          expiresIn: "60m",
        }),
        data:user,
      });
    if (info) return res.status(401).json(info);
  })(req, res, next);
};

/// update query on the register user

exports.update_employee = async (req, res) => {
  try {
    const valid = await update_employee.validateAsync(req.body);
    const details = {
      email: valid.email,
      gender: valid.gender,
      first_name: valid.first_name,
      last_name: valid.last_name,
    };
    registerd_employees.update(details, { where: { id:id.id } });
    return res.status(200).send({
      status: 200,
      data: details,
      message: "user updated",
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some error to update the data ",
      errors: error,
    });
  }
};

exports.update_employee_details = async (req, res) => {
  try {
    const valid = await auth_employee_register_details.validateAsync(req.body);
    const details = {
      contact: valid.contact,
      nationality: valid.nationality,
      state: valid.state,
      hometown: valid.hometown,
      currentlocation: valid.currentlocation,
      qualification: valid.qualification,
      experience: valid.experience,
      technologys: valid.technologys,
    };
    registered_employee_details.update(details, {
      where: { id: id.id },
    });
    return res.status(200).send({
      status: 200,
      data: details,
      message: "employee_details updated",
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some eroor on server side",
      error: error,
    });
  }
};

//delete user permanently from the database;

exports.delete_employee = async (req, res) => {
  try {
    const details = await registerd_employees.destroy({
      where: { id: id.id },
    });
    return res.status(200).send({
      status: 200,
      message: "user is deleted from the database",
      data: details,
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "there is some error in the data base",
      error: error,
    });
  }
};

exports.fulldetails = async (req, res) => {
  try {
    const details = await registerd_employees.findAll({
      where: { id: id.id },
      include: registered_employee_details,
    });
    return res.status(200).send({
      status: 200,
      message: "full details of all the user",
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

module.exports.display = async (req, res) => {
  const details = await registered_employee_data_model.findAll({where:{id:id.id}});
  try {
    return res.status(200).send({
      status: 200,
      data: details,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "there is some error",
    });
  }
};


// applied job entry

module.exports.appliedjobs = async (req,res)=>{
  console.log(id.id);
  try{
const valid = await auth_applied_jobs.validateAsync(req.body);
console.log(valid);
const details = {
Applied_role:valid.Applied_role,
experience:valid.experience,
skills:valid.skills,
job_location:valid.job_location,
package:valid.package,
job_type:valid.job_type,
recruiter_id:valid.recruiter_id,
employee_id:id.id,
}
applied_jobs.create(details).then((data)=>{
    return res.status(200).send({
        status:200,
        message:"job is applied",
        data:data
    })

})
  }
catch(error){
 return res.status(400).send({
   status:400,
   message:"there is some error to applied the job ",
   error:error
 })
}
}


//get applied jobs of single user


exports.userappliedjobs = async (req, res) => {
  try {
    const details = await applied_jobs.findAll({
     where: { employee_id: id.id }
    });
    return res.status(200).send({
      status: 200,
      message: "all the applied jobs of user",
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