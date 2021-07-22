// inculde the database config file for connection with DB
const dbconfig = require('../config/database_config');
//import the sequelize for ORM use to make easy with mysql
const Sequelize = require('sequelize');

//make the connection

const sequelize = new Sequelize(dbconfig.database,dbconfig.user,dbconfig.password,{
    host:dbconfig.host,
    dialect:dbconfig.dialect,
    operatorsAliases: false,
})

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


//employee models
db.register_employee_model = require('./register_employee_model')(sequelize,Sequelize);
db.register_employee_details = require('./register_employee_details')(sequelize,Sequelize);
db.register_employee_data_model = require('./register_employee_data_model')(sequelize,Sequelize);

//relation
db.register_employee_model.hasOne(db.register_employee_details,{foreignKey:"id"})
db.register_employee_details.belongsTo(db.register_employee_model,{foreignKey:'id'}); 
//relation 
db.register_employee_model.hasOne(db.register_employee_data_model,{foreignKey:"id"});
db.register_employee_data_model.belongsTo(db.register_employee_model,{foreignKey:"id"});


//recuriter models 

db.register_recruiter_model = require('./register_recruiter_model')(sequelize,Sequelize);




//job_post_models

db.recruiter_jobpost_model = require('./recruiter_jobpost_model')(sequelize,Sequelize);

//applied jobs by user 
db.Applied_jobs = require('./applied_jobs')(sequelize,Sequelize);

//relation between employee & applied job table

db.register_employee_model.hasMany(db.Applied_jobs,{foreignKey: 'employee_id', targetKey :'id'});
db.register_recruiter_model.hasMany(db.Applied_jobs,{foreignKey: 'recruiter_id', targetKey :'id'});

db.Applied_jobs.belongsTo(db.register_employee_model,{foreignKey: 'employee_id'})


//relation in recuritermodel & job_posts has has many 

db.register_recruiter_model.hasMany(db.recruiter_jobpost_model,{foreignKey:"id"});

module.exports = db;

