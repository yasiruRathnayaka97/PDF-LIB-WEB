const mongoose=require('../DB/DB');
require('../Schema/NotificationSchema');
const Notification = mongoose.model('Notification');
class AccountModel{
static async createNotification(sender,reciever,message,status){
  await Account.create({
    sender:sender,
    reciever:reciever,
    message:message,
    status:status
  });
}


static async getMessagesOfReciever(email){
  return await Notification.find({reciever:email});
}
static async getMessagesOfSender(sender){
    return await Notification.find({sender:email});
  }
static async deleteMessage(_id){
    return await Notification.deleteOne({_id});
}
static async updateStatus(reciever,status){
    return await Notification.updateOne({reciever:reciever},{status:status});
}
}
module.exports=AccountModel;

