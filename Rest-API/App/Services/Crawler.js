const pdfLib=require('pdfjs-dist');
class Crawler{

    static  createDocuments(path,pdfName){
    return new Promise((resolve, reject) =>{
        var pdf=pdfLib.getDocument(path);
        pdf.promise.then(async (pdfDoc)=>{
            var pdfDocArr=[];
            var pdfCharacterSizes=[];
            for (var pageNum = 1; pageNum <=pdfDoc.numPages ; pageNum++) {
             var extractedPageArr=[];
             var textItems=(await (await pdfDoc.getPage(pageNum)).getTextContent()).items;
             for (var i = 0; i < textItems.length; i++) {
                var item = textItems[i];
                pdfCharacterSizes.push(item.height);
                if(item.str!=' '){
                    extractedPageArr.push(item.str);
                }
              
             }
               
             console.log(pdfCharacterSizes);
             var result=await this.getURLs(extractedPage);
             var urlArr=result[0];
             extractedPage=result[1];
             var splitedArr =this.createSplitedArrPerPage(extractedPage);
             var pageDoc=this.createDocumentsPerPage(splitedArr,pageNum,pdfName,urlArr);
             pdfDocArr=pdfDocArr.concat(pageDoc);
             
            }
            resolve(pdfDocArr);
        });
    });         
       
    }
    
    
    static createSplitedArrPerPage(extractedPage){
       var seperators=["\.","\,","\:"]
       seperators.push("\,");
       var splitedArr=extractedPage;
       for (var i = 0; i < seperators.length; i++) {
            splitedArr=splitedArr.split(seperators[i]);
            if (i<seperators.length-1){
                splitedArr=splitedArr.join();
            }
       }
       
       return splitedArr;
    }
   static createDocumentsPerPage(splitedArr,pageNum,pdfName,urlArr){
    var documentsArr=[];
    var j=0;
    var sentence='';
    var about='';
    for (var i = 0; i < splitedArr.length; i++) {
        if (splitedArr[i]!=' '){
             if (splitedArr[i]=='@URLPDFLIB'){
                sentence=urlArr[j];
                about='URL';
                j++;

            }

            else{
                sentence=splitedArr[i];
                about='paragraph';
            }
           
        var doc={
            'pdfName':pdfName,
            'pageNum':pageNum,
            'sentence':sentence,
            'about':about
        }
        documentsArr.push(doc);
    }
    }
    return documentsArr;
   }
   
   static async getURLs(extractedPage){
    const urlPattern=/(http[s]?|ftp[s]?|ws[s]?):\/\/(?:[a-z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-f][0-9a-f]))+/g;
    var urlArr=extractedPage.match(urlPattern);
    var result=new Array();
    var newExtractedPage=extractedPage
    if (urlArr!=null){
        newExtractedPage=await extractedPage.replace(urlPattern,'.@URLPDFLIB.');
    }
    if (urlArr==null){
        urlArr=[];
    }
    
    
    result[0]=urlArr;
    result[1]=newExtractedPage;
    return result;
    
   }
}
module.exports=Crawler;