const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const accountSchema = new Schema({
  email:String,
  userName: String,
  password: String,
});


module.exports=mongoose.model('Account', accountSchema);