const SearchManger=require('../Services/SearchManager');
const Rating=require('../Models/RatingModel');

class SearchController{

    static async getSearch(sentence){
       var searchDoc={
            sentence:sentence
        }
        return await SearchManger.search(searchDoc) ;
    }

    static async ratePDF(pdfId,rate){
        var pre_rate=await Rating.getRating(pdfId).rate;
        var pre_count=await Rating.getRating(pdfId).count;
        var post_count=pre_count+1
        var post_rate=(pre_rate*pre_count+rate)/post_count
        return await Rating.updateRating(pdfId,post_rate,pre_count)
    }
}
module.exports=SearchController;