const DB = require('../util/db');
const FavCollection = require('../model/favCollection');

class FavCollectionService {

    static getFavCollection(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return connection;
            })
                .then(() => {
                    connection.query(`select * from fav_collection where user_id = ?`, userId, (err, data) => {
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
        let result = data.map( collection => {
            return new FavCollection(collection)
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

    static delFavCollection(collectionId, userId){
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
                    connection.query(`delete  from fav_collection where collection_id = ? and user_id = ?`, [collectionId,userId], (err, data) => {
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