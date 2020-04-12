const  AccountModel=require('../Models/AccountModel');
//const NotificationManager=require('../Services/NotifiactionManager');
const bcrypt = require('bcrypt');
const saltRounds = 12;
class AccountController{
    static async  signUp(userName,email,password){
        if(!await AccountModel.getAccount(email)){
        var hashedPassword=await bcrypt.hash(password, saltRounds);
        AccountModel.createAccount(userName,email,hashedPassword);
        return true;
        }
        else{
            return false;
        }
   
    }
    static async signIn(email,password){
            if(await bcrypt.compare(password,await AccountModel.getPassword(email))){
                return true;
            }
            else{
                return false;
            }
        }
    static async delete(email,password){
        if(await bcrypt.compare(password,await AccountModel.getPassword(email))){
            await AccountModel.deleteAccount(email);
            return true;
        }
        else{
        return false;
    }
       
}
}
module.exports=AccountController;