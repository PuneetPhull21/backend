module.exports = (sequelize,Sequelize) =>{
    const recuriter_job_posts = sequelize.define('recruiter_jobposts',{
        job_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          primaryKey:true,
        },
        job_role:{
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

    return recuriter_job_posts;
}