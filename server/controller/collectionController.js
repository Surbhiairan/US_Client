const collectionService = require('../service/collectionService');
class CollectionController{

    static addCollection(req,res){
        let payload  = req.body;
        collectionService.addCollection(payload).then( (collection) => {
            res.send(collection)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
    }
}

module.exports = CollectionController;