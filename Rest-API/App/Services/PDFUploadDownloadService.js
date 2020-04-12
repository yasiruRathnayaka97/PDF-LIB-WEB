var multer  = require('multer');
const fs = require('fs')
const path=require('path');
class PDFUploadDownloadService{
  static createUpload(pdfPath){
    const storage = multer.diskStorage({
      destination: (req, file, cb) =>{
          cb(null, pdfPath);
      },

      filename: function(req, file, cb) {
          cb(null, file.originalname);
      },
  });
    return multer({storage:storage,fileFilter:(req,file,cb)=>{
      if(path.extname(file.originalname)!='.pdf'){
        return cb(new Error('Not a pdf'));
      }
      else{
        cb(null,true);
      }
    }}).single('pdf');
   }
  static createDir(dir){
     fs.mkdirSync(dir);
   
  }
  static readDir(dir){
    return fs.readdirSync(dir);
  }
  static deleteDir(dir){

  }
  
}
module.exports=PDFUploadDownloadService;