const client=require('../DB/ElasticClient');
const index_name='pdf';
const result_size=5;
const pre='<tag>';
const post='</tag>';
const field= {
  'sentence' : {}
};
class SearchManager{
  
    static async search(searchDoc){
      var resultQueue=[];
      const { body } = await client.search({
        index: index_name,
        size:result_size,
        body: {
          query: {
            match: searchDoc
          },
          highlight : {
            pre_tags:pre,
            post_tags:post,
            fields : field
          }
        }
      })
    
      body.hits.hits.forEach((element) => {
        resultQueue.push({pdfName:element._source.pdfName,
          pageNum:element._source.pageNum,
        
      sentence:element.highlight.sentence});
        
      });
      return resultQueue;

    }
    
    //   var responseQueue=[];
    //   var resultQueue=[]
    //     const response = await client.search({
    //         index:index_name,
    //         scroll: '30s',
    //         size:result_size,
    //         body: searchDoc
    //       });
        
    //   responseQueue.push(response);
    //   while (responseQueue.length) {
    //     const { body } = responseQueue.shift();
    
    //     body.hits.hits.forEach(function (hit) {
    //       resultQueue.push(hit);
    //     })
    //     if (body.hits.total.value === resultQueue.length) {
    //       console.log(resultQueue);
    //       //return resultQueue;
  
    //     }
    //     responseQueue.push(
    //       await client.scroll({
    //         scrollId: body._scroll_id,
    //         scroll: '30s'
    //       })
    //     )
    //   }
    // }
    }
   module.exports=SearchManager; 




