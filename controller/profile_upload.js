//add the multer module for file upload


const multer = require('multer');
const path  =  require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./assets/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+""+Date.now()+""+file.originalname);
    }
})

/*const Filefilter = (req,file,cb)=>{
    if(req.file.mimeType === 'image/png' || req.file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg'){
        return cb(null,true)
    }
    else{
        cb(new Error ('Unsupported files'),false)
    }
}*/

var upload = multer({storage:storage,
    limits:{ 
     fileSize:3000000
    },
});


module.exports = upload;