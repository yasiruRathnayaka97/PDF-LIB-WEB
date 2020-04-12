const client=require('../DB/ElasticClient');
const schema=require('../Schema/ElasticSchema');
require('array.prototype.flatmap').shim();
const index_name='pdf';

class IndexManager{

    static async  run () {
       return await client.indices.create({
          index: index_name,
          body: {
            mappings: {
              properties:schema 
            }          }
        }, { ignore: [400] })
    }

    static async addDocuments(docArr){
        await this.run();
        var body = docArr.flatMap((doc) => [{ index: { _index: index_name } }, doc]);
        var { body: bulkResponse } = await client.bulk({ refresh: true, body })
        if (bulkResponse.errors) {
            const erroredDocuments = []
            bulkResponse.items.forEach((action, i) => {
                const operation = Object.keys(action)[0]
                if (action[operation].error) {
                  erroredDocuments.push({
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                  })
                }
              })
            return false;
          }
        
            var { body: count } = await client.count({ index: index_name })
            console.log(count);
            return true;
        
        
       
    }
}


module.exports=IndexManager;