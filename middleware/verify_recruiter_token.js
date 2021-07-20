const jwt = require('jsonwebtoken');


module.exports.verfiytoken = (req,res,next)=>{
    if('authorization' in req.headers){
       var token= req.headers['authorization'].split(' ')[1];
        if(!token){
           return res.send({
               auth:false,
               message:"token is not authorized"
            })
        }
    
        else{
           jwt.verify(token,"SECRETKEY12345",(err,user)=>{
                if(err){
                    res.send({auth:false,message:"token is not generated"})
                }
                else{
                    id = jwt.decode(token);
                   next(); 
                }
            });
        }
    };   
}