const FollowerService = require('../service/followerService')

class FollowerController{

     static followUser(req,res){   
        let userId = req.body['appUser']['id'];
        let followingId = req.body['following_id'];

        let payload = {
         'user_id' : userId,
         'following_id' : followingId   
        }
        FollowerService.followUser(payload).then( data =>{
            res.send(data)
        }).catch(err => {
            res.status(500);
            res.send(err);
        });
     }

     static getFollowers(req,res){
         console.log("All")
        let userId = req.body['appUser']['id'];
        FollowerService.getFollowers(userId).then( data =>{
            res.send(data)
        }).catch(err => {
            res.status(500);
            res.send(err);
        });
     }


}

module.exports = FollowerController;