const FavCollectionService = require('../service/FavCollectionService');

class FavCollectionController{

    static addFavCollection(req,res){
        let collectionId = req.body['collection_id'];
        let userId = req.body['appUser']['id'];
        FavCollectionService.addFavCollection(collectionId,userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            res.status(500);
            res.send(err);
        })
    }

    static getFavCollection(req,res){
        let userId = req.body['appUser']['id'];
        FavCollectionService.getFavCollection(userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            res.status(500);
            res.send(err);
        })
    }

    static delFavCollection(req,res){
        let collectionId = req.body['collection_id'];
        let userId = req.body['appUser']['id'];
        FavCollectionService.delFavCollection(collectionId,userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            res.status(500);
            res.send(err);
        })
    }

    
}

module.exports = FavCollectionController;