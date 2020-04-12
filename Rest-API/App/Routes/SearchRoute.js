const express=require('express');
const SearchController=require('../Controllers/SearchController');
const router=express.Router();

router.get('/search',async (req,res)=>{
    res.json(await SearchController.getSearch('  allow  the  manager  specific  variable'));
})



module.exports=router;
