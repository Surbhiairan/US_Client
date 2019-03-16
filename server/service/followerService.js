const DB = require('../util/db');
const FollowUser = require('../model/followUser');
const User = require('../model/user');

class FollowerService {


    static getFollow(id) {
        console.log("id.... ", id);
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
                        console.log("Follow User...........", data)
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
                                        FollowerService.getFollow(insertedId).then(data => {
                                            DB.release(connection)
                                            resolve(data);
                                        });
                                    })
                                }
                            });
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err);
                    })
            }
        })
    }

    static getFollowers(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `select u.id,u.first_name,u.email,u.role,u.is_active,u.is_profile,u.create_date,u.update_date,
                    u.created_by,u.updated_by from user u inner join follow_user fu
                    on fu.user_id = u.id where fu.following_id = 1`, userId , (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else if (data) {
                           let users = [];
                            if(data && data.length >0){
                                users = data.map( item => {
                                    return new User(item);
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

}



module.exports = FollowerService;