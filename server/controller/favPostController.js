const FavPostService = require('../service/favPostService');

class FavPostController{

    static addFavPost(req,res){
        let PostId = req.body['post_id'];
        let userId = req.body['appUser']['id'];
        FavPostService.addFavPost(PostId,userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            console.log(err)
            res.status(500);
            res.send(err);
        })
    }

    static getFavPost(req,res){
        let userId = req.body['appUser']['id'];
        FavPostService.getFavPost(userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            console.log(err)
            res.status(500);
            res.send(err);
        })
    }

    static delFavPost(req,res){
        let PostId = req.body['post_id'];
        let userId = req.body['appUser']['id'];
        FavPostService.delFavPost(PostId,userId).then( data =>{
            res.send(data);
        }).catch( err =>{
            console.log(err)
            res.status(500);
            res.send(err);
        })
    }

    
}

module.exports = FavPostController;