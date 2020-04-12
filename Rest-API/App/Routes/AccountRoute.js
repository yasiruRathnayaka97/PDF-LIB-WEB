const express=require('express');
const AccountController=require('../Controllers/AccountController');
const router=express.Router();

router.post('/signUp',async (req,res,next)=>{
  var userName=req.body.userName;
  var email=req.body.email;
  var password=req.body.password;
  res.send({'status':await AccountController.signUp(userName,email,password)});
 
});

router.post('/signIn',async (req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  res.json({'status':await AccountController.signIn(email,password)});
  
});

router.get('/delete/:email/:password',async (req,res,next)=>{
  var userName=req.params.email;
  var password=req.params.password;
  res.json({'status':await AccountController.delete(userName,password)});
 
});

router.get('/',(req,res,next)=>{
 res.json({'message':"welcome to PDF-Library Account."});
 next();
});

module.exports=router;



