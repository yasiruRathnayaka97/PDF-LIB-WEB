const mongoose=require('../DB/DB');
require('../Schema/PDFAccessSchema');
const Access = mongoose.model('Access');
class PDFAccessModel{
static async createAccess(email,pdfID,accessLevel){
  await Access.create({
    email:email,
    pdfID:pdfID,
    accessLevel:accessLevel
  });
}


static async getAccessByPdfID(pdfID){
    return await Access.find({pdfID:pdfID});
}

static async getAccessByEmail(email){
    return await Access.find({email:email});
}
static async deleteAccess(pdfID){
    return await Access.delete({pdfID:pdfID});
}
}
module.exports=PDFAccessModel;