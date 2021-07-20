module.exports = (sequelize,Sequelize) =>{
    const register_employee_model = sequelize.define('registered_employees',{
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        first_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        last_name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        gender:{
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

    return register_employee_model;
}