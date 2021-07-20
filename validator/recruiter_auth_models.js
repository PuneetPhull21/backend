const joi = require('@hapi/joi');

const auth_recruiter_register = joi.object({

    company_name:joi.string().required(),
    email:joi.string().required(),
    industry_experience:joi.string().required(),
    technologys:joi.string().required(),
    mobile_number:joi.number().required(),
    company_website:joi.string().required(),
    password:joi.string().min(5).required(),

})

const auth_recruiter_update = joi.object({
    company_name:joi.string().required(),
    email:joi.string().required(),
    industry_experience:joi.string().required(),
    technologys:joi.string().required(),
    mobile_number:joi.number().required(),
    company_website:joi.string().required(),
})

const auth_recruiter_jobpost = joi.object({
    job_role:joi.string().required(),
    experience:joi.string().required(),
    skills:joi.string().required(),
    job_location:joi.string().required(),
    package:joi.string().required(),
    job_type:joi.string().required(),
})

module.exports = {
    auth_recruiter_register,
    auth_recruiter_update,
    auth_recruiter_jobpost
}