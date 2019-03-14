const AWS = require('../util/aws');
const DB = require('../util/db');
const Collection = require('../model/collection');
class CollectionService{

    static getCollectionByID(id){
        var connection;
        return new Promise((resolve,reject) =>{
            connection.query(`select * from collection where id = ? `,[id],(err,data) =>{
                if( err ){ reject(err) }
                else{
                    let collection = new Collection(data[0]);
                    resolve(collection);
                }
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
                        DB.getCollectionByID( data.insertId).then( collection => {
                            resolve(collection);
                        })
                    }
                })
            })
            .catch( (err) => {
                reject(err);
            })
        })
    }
}

module.exports = CollectionService;