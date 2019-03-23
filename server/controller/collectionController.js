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
        let appUserId = req.body['appUser']['id'];

        collectionService.getUsersCollection(userId,appUserId).then( collections => {
            res.send(collections);
        }).catch( err => {
            res.status(500);
            res.send(err);
        })
    }

    static editCollection(req,res){
        let collection = req.body;
        let collectionId = req.params['collectionId']
        collectionService.editCollection(collectionId,collection).then( collections => {
            res.send(collections);
        }).catch( err => {
            res.status(500);
            res.send(err);
        })
    }

    
    static getAllcollectionById(req,res){
        let id = req.params['collectionId']
        collectionService.getCollectionByID(id).then( (collection ) =>{
            res.send(collection);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        }) 
    }


    static getAllcollection(req,res){        
            collectionService.getAllCollection().then( (collections) =>{
                res.send(collections);
            })
            .catch(err => {
                res.status(500);
                res.send(err);
            })    
    }

    static getcollectionFollowers(req,res){
        let collectionId = req.params['collectionId'];
        collectionService.getcollectionFollowers(collectionId).then( (followers) =>{
            res.send(followers);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
    }
    
    static deleteCollection(req,res){
        let collectionId = req.params['collectionId'];
        collectionService.deleteCollection(collectionId).then( (data) =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
    }
}

module.exports = CollectionController;