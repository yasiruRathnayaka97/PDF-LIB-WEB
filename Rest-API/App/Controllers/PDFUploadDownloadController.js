const PDFUploadDownload=require('../Services/PDFUploadDownloadService');
const Crawler=require('../Services/Crawler');
const IndexManager=require('../Services/IndexManager');
class PDFUploadDownloadController{

static getPDFUpload(){
    var email='example@example.com';
    var timeStamp=Date.now();
    var pdfPath=this.getPDFUploadPath(email,timeStamp);
    PDFUploadDownload.createDir(pdfPath);
    return PDFUploadDownload.createUpload(pdfPath);
}
//create unique pdf names.
static getPDFUploadPath(email,timeStamp){
    var pdfPath='uploads/'+email+'_'+timeStamp+'_PDF';
    return pdfPath;
}
static async createDocuments(dirPath){
    var pdf=PDFUploadDownload.readDir('uploads/'+dirPath);
    return await Crawler.createDocuments('uploads/'+dirPath+'/'+pdf[0],'examplePDF');
    
}
static async addDocuments(docArr){
  return await IndexManager.addDocuments(docArr);
}
}
module.exports=PDFUploadDownloadController;