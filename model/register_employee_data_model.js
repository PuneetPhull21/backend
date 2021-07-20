module.exports = (sequelize,Sequelize)=>{
    const mediadata = sequelize.define('registered_employee_mediadata',{
        employee_mediadata_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        profile_pic:{
            type:Sequelize.STRING,
            allowNull:false
        },
        id:{
         type:Sequelize.INTEGER,
         allowNull:false
        }
    },{
        timestamps:false
    })
 return mediadata;
}