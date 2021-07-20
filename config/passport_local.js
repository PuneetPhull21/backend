const localpassport = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport  = require('passport');
const db  =require('../model/index');
const register_employee_model = db.register_employee_model;

passport.use('local-employee',
    new localpassport({usernameField:'email'},
    async (email,password,done)=>{
        const user = await register_employee_model.findOne({where:{email:email}},
            function(err){
            if(err) return done(err)
            })
            if(!user){
                return done(null,false,{message:"Incorrect is email"})
            }
            const result = user;
            const value =  bcrypt.compareSync(password,result.password); 
            if(value === true){
                return done(null,user)
            }
            else{
                return done(null,false,{message:"password is wrong"})
            }
              
    }
    )
)


