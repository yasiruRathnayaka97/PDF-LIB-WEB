const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const pdfAccessSchema = new Schema({
    email:String,
    pdfId:String,
    accessLevel:String,
});

module.exports=mongoose.model('Access', pdfAccessSchema);
