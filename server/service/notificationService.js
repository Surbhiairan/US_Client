const DB = require('../util/db');
const UserService = require('../service/userService')
const collectionService = require('../service/collectionService');
class NotificationService {

    static addFollowNotication(userId, followingId) {
        return new Promise((resolve, reject) => {
            UserService.getUserById(userId).then(user => {
                let payload = {
                    'user_id': followingId,
                    'msg': `${user.firstName} started following you !`
                }
                payload = DB.addAttributesForNew(payload);
                NotificationService.addNotification(payload).then(data => {
                    resolve(data);
                })
            }).catch(err => {
                reject(err);
            })
        });
    }

    static addFollowCollectionNotification(collectionId, uId) {
        return new Promise((resolve, reject) => {
            var userId;
            var followerName;
            var collectionname;
            collectionService.getCollectionByID(collectionId).then(collection => {
                userId = collection.userId;
                collectionname = collection.collectionTitle;
                UserService.getUserById(uId).then(user => {
                    followerName = user.firstName;
                    let payload = {
                        'user_id': userId,
                        'msg': `${followerName} started following your collection - ${collectionname}!`
                    }
                    payload = DB.addAttributesForNew(payload);
                    NotificationService.addNotification(payload).then(data => {
                        resolve(data);
                    })
                })
            })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static addCommentNotification(postId, userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                var postOwner;
                var commentAuthor;
                var postTitle;
                connection.query(`select u.id,p.post_title from 
                post p inner join collection c on p.collection_id = c.id
                inner join user u on c.user_id = u.id
                where p.id = ?`, [postId], (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (data && data.length > 0) {
                                postOwner = data[0].id;
                                postTitle = data[0].post_title;
                                UserService.getUserById(userId).then(user => {
                                    commentAuthor = user.firstName;
                                    let payload = {
                                        'user_id': postOwner,
                                        'msg': `${commentAuthor} commented on your post - ${postTitle} !`
                                    }
                                    payload = DB.addAttributesForNew(payload);
                                    NotificationService.addNotification(payload).then(data => {
                                        DB.release(connection)
                                        resolve(data);
                                    })

                                })
                            }
                        }
                    })
            })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static addfavoritePostNotification(postId, userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                var postOwner;
                var commentAuthor;
                var postTitle;
                connection.query(`select u.id,p.post_title from 
                post p inner join collection c on p.collection_id = c.id
                inner join user u on c.user_id = u.id
                where p.id = ?`, [postId], (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (data && data.length > 0) {
                                postOwner = data[0].id;
                                postTitle = data[0].post_title;
                                UserService.getUserById(userId).then(user => {
                                    commentAuthor = user.firstName;
                                    let payload = {
                                        'user_id': postOwner,
                                        'msg': `${commentAuthor} Favorited on your post - ${postTitle}`
                                    }
                                    payload = DB.addAttributesForNew(payload);
                                    NotificationService.addNotification(payload).then(data => {
                                        DB.release(connection)
                                        resolve(data);
                                    })

                                })
                            }
                        }
                    })
            })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static addNotification(payload) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(
                        `INSERT INTO notification SET ?`, payload, (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection)
                                reject(err);
                            } else if (data) {
                                DB.commitTransaction(connection);
                                DB.release(connection);
                                resolve(data);
                            }
                        });
                })
                .catch(err => {
                    reject(err);
                })

        })
    }

    static getNotification(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            var msgs;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`select msg from notification where user_id = ?`, userId, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (data && data.length > 0) {
                                msgs = data;
                                connection.query(`delete from notification where user_id = ?`, userId, (err, data) => {
                                    if (err) {
                                        DB.rollbackTransaction(connection);
                                        DB.release(connection);
                                        reject(err);
                                    } else {
                                        DB.commitTransaction(connection);
                                        DB.release(connection);
                                        let notification = msgs.map(item => {
                                            return item.msg + "";
                                        })
                                        resolve(notification);
                                    }
                                });
                            }else{
                                resolve(data);
                            }
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = NotificationService;