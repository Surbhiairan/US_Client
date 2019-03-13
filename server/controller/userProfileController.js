const UserProfileService = require('../service/userProfileService');
class UserProfileController{

        static addProfile(req,res){
                let payload = req.body; 
                UserProfileService.addProfile(payload).then( data =>{
                        res.send(data);
                }).catch(err =>{
                        res.status(501);
                        res.send(err);
                })
        }
}

module.exports = UserProfileController;