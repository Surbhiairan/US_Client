const DB = require('../util/db');
const FavCollection = require('../model/favCollection');
const Collection = require('../model/collection');
const NotificationService = require('../service/notificationService');
class FavCollectionService {

    static getFavCollection(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return connection;
            })
                .then(() => {
                    connection.query(`select c.id,c.collection_title,c.collection_text,c.collection_image,fc.create_date,fc.update_date,
                    fc.created_by,fc.updated_by,u.first_name,u.email,
                    (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav
                     from fav_collection fc
                    inner join collection c on fc.collection_id = c.id 
                    inner join user u on u.id = fc.user_id
                    where fc.user_id = ?;`, userId, (err, data) => {
                            DB.release(connection);
                            if (err) {
                                reject(err);
                            } else {
                                let favCollection = []
                                if (data && data.length > 0) {
                                    favCollection = FavCollectionService.mapToFavCollection(data);
                                }
                                resolve(favCollection);
                            }
                        });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static mapToFavCollection(data) {
        let result = data.map(item => {
           let coll = new Collection(item);
           coll['authorName'] = item['first_name'];
           coll['authorEmail'] = item['email'];
           coll['totalFavorites'] = item['total_fav']
           return coll;
        });
        return result;
    }

    static addFavCollection(collectionId, userId) {
        var favCollection = {
            'collection_id': collectionId,
            'user_id': userId
        }
        favCollection = DB.addAttributesForNew(favCollection);
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`INSERT INTO fav_collection SET ?`, favCollection, (err, data) => {
                        if (err) {
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            reject(err);
                        } else {
                            DB.commitTransaction(connection).then(() => {
                                NotificationService.addFollowCollectionNotification(collectionId,userId).then(() => {
                                    FavCollectionService.getFavCollection(userId).then(collection => {
                                        resolve(collection);
                                    })
                                });                                
                            })
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static delFavCollection(collectionId, userId) {
        var favCollection = {
            'collection_id': collectionId,
            'user_id': userId
        }
        favCollection = DB.addAttributesForNew(favCollection);
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`delete  from fav_collection where collection_id = ? and user_id = ?`, [collectionId, userId], (err, data) => {
                        if (err) {
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            reject(err);
                        } else {
                            DB.commitTransaction(connection).then(() => {
                                FavCollectionService.getFavCollection(userId).then(collection => {
                                    resolve(collection);
                                })
                            })
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = FavCollectionService;