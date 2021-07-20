module.exports = (sequelize,Sequelize)=>{
    const Applied_jobs = sequelize.define('applied_jobs',{
        applied_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Applied_role:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        experience:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        skills:{
          type:Sequelize.STRING,
          allowNull:false
        },
        job_location:{
            type:Sequelize.STRING,
            allowNull:false
        },
        package:{
           type:Sequelize.STRING,
           allowNull:false
        },
        job_type:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    })
 return Applied_jobs;   
}