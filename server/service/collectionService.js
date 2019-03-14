const AWS = require('../util/aws');
const DB = require('../util/db');
const Collection = require('../model/collection');
class CollectionService{

    static getCollectionByID(id){
        return new Promise((resolve,reject) =>{
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return connection

            })
            .then( connection => {
                connection.query(`select * from collection where id = ? `,[id],(err,data) =>{
                    DB.release(connection);
                    if( err ){ reject(err) }
                    else{
                        let collection = new Collection(data[0]);
                        resolve(collection);
                    }
                })
            })
            .catch( err => {
                reject(err);
            })
        })
    }

    static addCollection(collection){
        let image = collection ['collection_image'];
        let imageName = new Date().getTime()+".png";
        return new Promise( (resolve,reject) => {
            var connection;
            var imageURL;
            AWS.uploadImage(image,imageName)
            .then( url => {
                imageURL = url;
                return DB.getConnection()
            })
            .then( conn => {
                connection = conn;
                return DB.beginTransaction(connection);               
            })
            .then( () =>{
                collection = DB.addAttributesForNew(collection);
                collection.collection_image = imageURL;
                connection.query(`INSERT INTO collection SET ?`, collection, (err, data) => {
                    if(err){
                        DB.release(connection);
                        reject(err);
                    }else{
                        DB.commitTransaction(connection).then(() =>{
                            CollectionService.getCollectionByID( data.insertId).then( collection => {
                                resolve(collection);
                            })
                        });                        
                    }
                })
            })
            .catch( (err) => {
                reject(err);
            })
        })
    }

    static getUsersCollection(userId){
        console.log("userId...........",userId)
        var connection;
        return new Promise( (resolve,reject) =>{
            DB.getConnection().then( conn => {
                connection = conn;
                connection.query('select * from collection where user_id = ?',[userId],(err,data) => {
                    DB.release(connection);
                    if(err){
                        reject(err);
                    }else{
                        console.log(data)
                        resolve(CollectionService.mapToCollection(data));
                    }
                })
            }).catch(err => {
                reject(err);
            })
        });
    }

    static mapToCollection(collections){
        let result = collections.map( collection => {
            return new Collection(collection)
        });
        return result;
    }

   
    static editCollection(collectionId,coll) {
        var connection;
        var collection;
        return new Promise((resolve, reject) => {

            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    
                    return new Promise((resolve, reject) => {
                        connection.query('select * from collection where id = ? ', [collectionId], (err, data) => {
                            if (err) { reject(err) }
                            else {
                                collection = new Collection(data[0]);
                                if (coll.collection_image) {
                                    AWS.updateProfile(coll.collection_image, collection.collectionImage).then(url => {
                                        resolve(url);
                                    })
                                } else {
                                    resolve(collection.collectionImage);
                                }
                            }
                        });
                    });
                })
                .then((imageURL) => {
                    collection = DB.addAttributesForEdit(collection);                    
                    connection.query(`update collection set collection_title =? ,collection_text = ? ,collection_image = ? ,create_date=?,update_date=?,created_by=?,updated_by=? where id=?`,
                        [ coll.collection_title,coll.collection_text, imageURL, collection.createDate, collection.update_date,
                            collection.createdBy, collection.updated_by, collectionId], (err, data) => {
                            if (err) {
                                console.log(err)
                                DB.rollbackTransaction(connection);
                                DB.release(connection);
                                reject(err);
                            }
                            else {
                                DB.commitTransaction(connection);
                                connection.query('select * from collection where id = ? ', [collectionId], (err, data) => {
                                    DB.release(connection);
                                    if (err) {
                                        reject(err)
                                    }
                                    else {
                                        resolve(new Collection(data[0]));
                                    }
                                });
                            }
                        });
                }).catch(err => {
                    console.log(err)
                    reject(err);
                });
        });
    }



}

module.exports = CollectionService;