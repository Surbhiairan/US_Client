const UserProfileService = require('../service/userProfileService');
class UserProfileController{

        static addProfile(req,res){
                let payload = req.body; 
                UserProfileService.addProfile(payload).then( data =>{
                        res.send(data);
                }).catch(err =>{
                        res.status(500);
                        res.send(err);
                })
        }

        static updateProfile(req,res){
                let profile = req.body;
                UserProfileService.updateProfile(profile).then( data =>{
                        res.send(data);
                }).catch(err =>{
                        res.status(500);
                        res.send(err);
                })
        }

        static getProfile(req,res){
                let userId = req.params['userId'];
                UserProfileService.getProfile(userId).then( data =>{
                        res.send(data);
                }).catch( err =>{
                        res.status(500);
                        res.send(err);
                })

        }
}

module.exports = UserProfileController;