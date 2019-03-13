const AWS = require('../util/aws');
const DB = require('../util/db');
const UserProfile = require('../model/userProfile');
class UserProfileService{
    

    static addProfile(profile){
        const imagePayload = profile.profile_img;
        const imgName = new Date().getTime()+".png";
        var insertedId;
        profile = DB.addAttributesForNew(profile);
        var connection;
        return new Promise((resolve,reject) =>{
            AWS.uploadImage(imagePayload,imgName)
            .then( imageURL =>{
                profile.profile_img = imageURL;
                return DB.getConnection();
            })
            .then( conn =>{
                connection = conn;
                return DB.beginTransaction(connection);
            })
            .then(() =>{
                return new Promise((r,rj) =>{
                    connection.query(
                        `INSERT INTO user_profile SET ?`, profile, (err,data) => {
                            if(err){
                                DB.rollbackTransaction(connection);
                                DB.release(connection)
                                reject(err);  
                            }else if(data){
                                insertedId = data.insertId;
                                DB.commitTransaction(connection).then(() =>{
                                    r();
                                })                      
                            }
                        });
                });               
            })
            .then(() =>{
                connection.query(
                    `select * from user_profile where id =  ?`, [insertedId], (err,profile) => {
                        if(err) reject(err)
                        else{
                            DB.release(connection);
                            resolve( new UserProfile(profile[0]));
                        }
                    });
            })
            .catch(err =>{
                reject(err);  
            });
        })
    }

    static updateProfile(profile){
        var connection;
        return new Promise( (resolve,reject) =>{
            
            DB.getConnection().then( conn =>{
                connection = conn;
                return DB.beginTransaction(connection);
            })
            .then( () =>{
                if(profile.profile_img){
                    connection.query('select * from user_profile where id = ? ' [profile.id],(err,data) =>{

                    })

                }else{
                    return new Promise((resolve,reject) => { resolve(null)})
                }
            }).catch(err => {
                reject(err);
            });
        });        
    }
}

module.exports = UserProfileService;