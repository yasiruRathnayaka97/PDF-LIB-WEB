const express=require('express');
const path = require('path');
const multer = require('multer');
const UD=require('../Controllers/PDFUploadDownloadController');
const router=express.Router();

router.post('/upload',async (req,res,next)=>{
    var upload=await UD.getPDFUpload();
    upload(req,res,(err)=>{
    if(err){
        res.json({
            'status':false
        });
    }
    else{
        res.json({
            'status':true
        });
    }
    });
   UD.addDocuments(await UD.createDocuments('example@example.com_1585431623624_PDF'));
})
module.exports=router;
