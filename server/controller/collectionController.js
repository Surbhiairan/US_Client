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


    static getUsersCollection(req,res){
        let userId = req.params['userId'];
        collectionService.getUsersCollection(userId).then( collections => {
            res.send(collections);
        }).catch( err => {
            res.status(501);
            res.send(err);
        })
    }

    static editCollection(req,res){
        let collection = req.body;
        let collectionId = req.params['collectionId']
        collectionService.editCollection(collectionId,collection).then( collections => {
            res.send(collections);
        }).catch( err => {
            res.status(501);
            res.send(err);
        })
    }

    static getAllcollection(req,res){        
            collectionService.getAllCollection().then( (collections) =>{
                res.send(collections);
            })
            .catch(err => {
                res.status(501);
                res.send(err);
            })    
    }
    
}

module.exports = CollectionController;