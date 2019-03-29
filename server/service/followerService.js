const DB = require('../util/db');
const FollowUser = require('../model/followUser');
const User = require('../model/user');
const NotificationService = require('../service/notificationService');

class FollowerService {


    static getFollow(id) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query('select * from follow_user where id = ? ', [id], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {

                        let followUser = {};
                        if (data && data.length > 0) {
                            followUser = new FollowUser(data[0]);
                        }
                        resolve(followUser);
                    }
                })
            })
        })
            .catch(err => {
                reject(err);
            });
    }

    static followUser(payload) {
        var connection;
        var insertedId;
        return new Promise((resolve, reject) => {
            if (payload['user_id'] == payload['following_id']) {
                reject("Follower_ID Can not be same as Logged In User_ID");
            } else {
                DB.getConnection().then(conn => {
                    connection = conn;
                    return DB.beginTransaction(connection);
                })
                    .then(() => {
                        payload = DB.addAttributesForNew(payload);
                        connection.query(
                            `INSERT INTO follow_user SET ?`, payload, (err, data) => {
                                if (err) {
                                    DB.rollbackTransaction(connection);
                                    DB.release(connection)
                                    reject(err);
                                } else if (data) {
                                    insertedId = data.insertId;
                                    DB.commitTransaction(connection).then(() => {
                                        NotificationService.addFollowNotication(payload['user_id'], payload['following_id']).then(() => {
                                            FollowerService.getFollow(insertedId).then(data => {
                                                DB.release(connection)
                                                resolve(data);
                                            });
                                        });
                                    })
                                }
                            });
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        })
    }

    static unFollowUser(userId, followingID) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(
                        `Delete from follow_user where user_id =? and following_id =?`, [userId, followingID], (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection)
                                reject(err);
                            } else if (data) {
                                DB.commitTransaction(connection).then(() => {
                                    resolve();
                                })
                            }
                        });
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static getFollowers(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `select u.id,u.first_name,u.email,u.role,u.is_active,u.is_profile,u.create_date,u.update_date,
                    u.created_by,u.updated_by,up.profile_img,up.bio,
                   (select count(*) from follow_user fuser where fuser.following_id = u.id) total_followers
                    from user u inner join follow_user fu on fu.user_id = u.id
                    inner join user_profile up on up.user_id = u.id
                    where fu.following_id = ?`, userId, (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else if (data) {
                            let users = [];
                            if (data && data.length > 0) {
                                users = data.map(item => {
                                    let user = new User(item);
                                    user['bio'] = item['bio']
                                    user['profileImg'] = item['profile_img']
                                    user['totalFollowers'] = item['total_followers']
                                    return user;
                                })
                            }
                            resolve(users)
                        }
                    });
            })
                .catch(err => {
                    reject(err);
                })

        })
    }

    static getFollowingUser(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select u.id,u.first_name,u.email,u.role,u.is_active,u.is_admin_approved,u.is_profile,
                (select profile_img from user_profile up where up.user_id = u.id) profile_img 
                from follow_user fu inner join user u on fu.following_id = u.id
                where fu.user_id = ?`, [userId], (err, data) => {
                        DB.release(connection)
                        if (err) {
                            reject(err)
                        } else {
                            let users = [];
                            if (data && data.length > 0) {
                                users = data.map(item => {
                                    let user = {};
                                    user = new User(item);
                                    user['profileImg'] = item.profile_img
                                    user['isAdminApproved'] = (item['is_admin_approved'] == 1 ? true : false);
                                    return user;
                                });
                            }
                            resolve(users);
                        }
                    });
            })
                .catch(err => {

                })
        });
    }

}



module.exports = FollowerService;