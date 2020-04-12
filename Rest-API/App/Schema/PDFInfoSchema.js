const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const pdfInfoSchema = new Schema({
  pdfID:Number,
  PdfName:String,
  uploadDate:Date,
});

module.exports=mongoose.model('PDF', pdfInfoSchema);