const SearchService = require('../service/searchService');
class SearchController{

    static search(req,res){
        let key = req.query['key'];
        SearchService.search(key).then( data =>{
            res.send(data);
        }).catch( err => {
            res.status(500);
            res.send(err);
        })
    }

}

module.exports = SearchController;