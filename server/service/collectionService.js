const AWS = require('../util/aws');
const DB = require('../util/db');
const Collection = require('../model/collection');
class CollectionService {

    static getCollectionByID(id) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return connection

            })
                .then(connection => {
                    connection.query(`select c.id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email,
                (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav 
                from collection c                 
                inner join user u on u.id = c.user_id
                where c.id = ? `, [id], (err, data) => {
                            DB.release(connection);
                            if (err) { reject(err) }
                            else {
                                let collection = {}
                                if (data && data.length > 0) {
                                    collection = new Collection(data[0]);
                                    collection['totalFavorites'] = data[0]['total_fav'];
                                    collection['authorName'] = data[0]['first_name'];
                                    collection['authorEmail'] = data[0]['email'];

                                }
                                resolve(collection);
                            }
                        })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static addCollection(collection) {
        //console.log("collection----", collection)
        delete collection['appUser'];
        let image = collection['collection_image'];
        let imageName = new Date().getTime() + ".png";
        return new Promise((resolve, reject) => {
            var connection;
            var imageURL;
            AWS.uploadImage(image, imageName)
                .then(url => {
                    imageURL = url;
                    return DB.getConnection()
                })
                .then(conn => {
                    connection = conn;
                    return DB.beginTransaction(connection);
                })
                .then(() => {
                    collection = DB.addAttributesForNew(collection);
                    collection.collection_image = imageURL;
                    connection.query(`INSERT INTO collection SET ?`, collection, (err, data) => {
                        if (err) {
                            DB.release(connection);
                            reject(err);
                        } else {
                            DB.commitTransaction(connection).then(() => {
                                CollectionService.getCollectionByID(data.insertId).then(collection => {
                                    resolve(collection);
                                })
                            });
                        }
                    })
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    static getUsersCollection(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select c.id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email,
                (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav 
                from collection c
                inner join user u on u.id = c.user_id
                where c.user_id = ?`, [userId], (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(CollectionService.mapToCollection(data));
                        }
                    })
            }).catch(err => {
                reject(err);
            })
        });
    }

    static mapToCollection(collections) {
        let result = collections.map(item => {
            let collection;
            collection = new Collection(item);
            collection['totalFavorites'] = item['total_fav']
            collection['authorName'] = item['first_name']
            collection['authorEmail'] = item['email']
            //collection['totalFavorites'] = data[0]['total_fav']
            return collection;
        });
        return result;
    }


    static editCollection(collectionId, coll) {
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
                        [coll.collection_title, coll.collection_text, imageURL, collection.createDate, collection.update_date,
                        collection.createdBy, collection.updated_by, collectionId], (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection);
                                reject(err);
                            }
                            else {
                                DB.commitTransaction(connection);
                                CollectionService.getCollectionByID(collectionId).then(collection => {
                                    resolve(collection)
                                })
                            }
                        });
                }).catch(err => {
                    reject(err);
                });
        });
    }


    static getAllCollection() {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select c.id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email,
                (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav 
                from collection c
                inner join user u on u.id = c.user_id`, [], (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(CollectionService.mapToCollection(data));
                        }
                    })
            }).catch(err => {
                reject(err);
            })
        });
    }

    static search(key) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                var qr = `select c.id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email,
                (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav 
                from collection c
                inner join user u on u.id = c.user_id where collection_title like "%` + key.replace(/['"]+/g, '') + `%"`;
                connection = conn;
                connection.query(qr, [], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(CollectionService.mapToCollection(data));
                    }
                });
            })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static getcollectionFollowers(collectionId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select c.id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email
                from fav_collection fc inner join collection c on fc.collection_id = c.id
                inner join user u on u.id = fc.user_id
                where fc.collection_id = ?;`, [collectionId], (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            let results = [];
                            results = data.map(item => {
                                let collection;
                                collection = new Collection(item);
                                collection['followerName'] = item['first_name']
                                collection['folowerEmail'] = item['email']
                                collection['folowerId'] = collection['userId']
                                delete collection['userId'];
                                
                                //collection['totalFavorites'] = data[0]['total_fav']
                                return collection;
                            });
                            resolve(results);
                        }
                    })
            });
        })
    }

    static deleteCollection(collectionId){
        var connection;
        return new Promise( (resolve,reject) =>{
            DB.getConnection().then(conn => {
                connection = conn;
                DB.beginTransaction(connection);
            })
            .then( () => {
                return new Promise( (r,rj) =>{
                    // delete from collection;
                    connection.query('delete from collection where id = ?',[collectionId],(err,data) =>{
                        if(err) { 
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            rj(err);
                        }else{
                            r(data);
                        }
                    });
                })
            })
            .then( () => {
                // delete all Posts for collection - id
                return new Promise( (r,rj) =>{
                    // delete from post;
                    connection.query('delete from post where collection_id = ?',[collectionId],(err,data) =>{
                        if(err) { 
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            rj(err);
                        }else{
                            r(data);
                        }
                    });
                })
            })
            .then( () => {
                // delete all fav collection - id
                return new Promise( (r,rj) =>{
                    // delete from fav_collection;
                    connection.query('delete from fav_collection where collection_id = ?',[collectionId],(err,data) =>{
                        if(err) { 
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            rj(err);
                        }else{
                            r(data);
                        }
                    });
                })
            })
            .then( () =>{
                DB.commitTransaction(connection);
                DB.release(connection);
                resolve("Collection deleted successfully")
            })
            .catch( err => {
                reject(err);
            })

        })
    }

}

module.exports = CollectionService;