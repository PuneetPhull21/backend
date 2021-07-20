module.exports = (sequelize,Sequelize)=>{

    const register_recruiter_model = sequelize.define('registered_recruiters',{
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        company_name:{
          type:Sequelize.STRING,
          allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        industry_experience:{
            type:Sequelize.STRING,
            allowNull:false
        },
        technologys:{
           type:Sequelize.STRING,
           allowNull:false
        },
        mobile_number:{
         type:Sequelize.INTEGER,
         allowNull:false
        },
        company_website:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    })
    return register_recruiter_model;
}