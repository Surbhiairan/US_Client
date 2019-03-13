const AWS = require('../util/aws');
const DB = require('../util/db');
class UserProfileService{
    
    static addProfile(profile){
        const imagePayload = profile.profile_img;
        const imgName = new Date().getTime()+".png";
        profile = DB.addAttributesForNew(profile);
        var connection;
        return new Promise((resolve,reject) =>{
            console.log("uploading..");
            AWS.uploadImage(imagePayload,imgName)
            .then( imageURL =>{
                console.log("imgURL",imageURL);
                profile.profile_img = imageURL;
                return DB.getConnection();
            })
            .then( conn =>{
                connection = conn;
                return DB.beginTransaction(connection);
            })
            .then(() =>{
                connection.query(
                    `INSERT INTO user_profile SET ?`, profile, (err,data) => {
                        if(err){
                            DB.rollbackTransaction(connection);
                            DB.release(connection)
                            reject(err);  
                        }else if(data){
                            DB.commitTransaction(connection);
                            DB.release(connection)
                            resolve(profile);
                        }
                    });
            }).
            catch(err =>{
                reject(err);  
            });
        })
    }
}

module.exports = UserProfileService;