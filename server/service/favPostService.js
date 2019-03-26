const DB = require('../util/db');
const FavPost = require('../model/favPost');
const NotificationService = require('../service/notificationService');

class FavPostService {

    static getFavPost(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return connection;
            })
                .then(() => {
                    connection.query(`select * from fav_post where user_id = ?`, userId, (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            let favPost = []
                            if (data && data.length > 0) {
                                favPost = FavPostService.mapToFavPost(data);
                            }
                            resolve(favPost);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static mapToFavPost(data) {
        let result = data.map( Post => {
            return new FavPost(Post)
        });
        return result;
    }

    static addFavPost(PostId, userId) {
        var favPost = {
            'post_id': PostId,
            'user_id': userId
        }
        favPost = DB.addAttributesForNew(favPost);
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`INSERT INTO fav_post SET ?`, favPost, (err, data) => {
                        if (err) {
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            reject(err);
                        } else {
                            DB.commitTransaction(connection).then(() => {
                                NotificationService.addfavoritePostNotification(PostId,userId).then(()=>{
                                    FavPostService.getFavPost(userId).then(Post => {
                                        resolve(Post);
                                    });
                                });
                            });
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static delFavPost(PostId, userId){
        var favPost = {
            'post_id': PostId,
            'user_id': userId
        }
        favPost = DB.addAttributesForNew(favPost);
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`delete  from fav_post where post_id = ? and user_id = ?`, [PostId,userId], (err, data) => {
                        if (err) {
                            DB.rollbackTransaction(connection);
                            DB.release(connection);
                            reject(err);
                        } else {
                            DB.commitTransaction(connection).then(() => {
                                FavPostService.getFavPost(userId).then(Post => {
                                    resolve(Post);
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

module.exports = FavPostService;