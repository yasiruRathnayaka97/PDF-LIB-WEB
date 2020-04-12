const mongoose=require('../DB/DB');
require('../Schema/AccountSchema');
const Account = mongoose.model('Account');
class AccountModel{
static async createAccount(userName,email,password){
  await Account.create({
    userName:userName,
    password:password,
    email:email
  });
}


static async getPassword(email){
  var acc=await this.getAccount(email);
  return acc.password;
}
static async getAccount(email){
  return await Account.findOne({email:email});
}
static async deleteAccount(email){
    return await Account.deleteOne({email:email});
}
}
module.exports=AccountModel;