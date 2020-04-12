const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  senderEmail:String,
  recieverEmail: String,
  message: String,
  status:String
});


module.exports=mongoose.model('Notification', notificationSchema);