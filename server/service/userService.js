const DB = require('../util/db');
const bcrypt = require('bcrypt');
const salt = 10;
const User = require("../model/user");
const config = require('../config/env');
const jwt = require('jsonwebtoken');
const EmailGun = require('../util/emailGun');

class userService {

    static getJWTToken(payload) {
        return jwt.sign(JSON.stringify(payload), config.secret);
    }

    static addUser(user) {
        user['password'] = bcrypt.hashSync(user.password, salt);
        user = DB.addAttributesForNew(user);

        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `INSERT INTO User SET ?`, user, (err, data) => {
                        if (err) {
                            DB.rollbackTransaction(connection);
                            DB.release(connection)
                            reject(err);
                        } else if (data) {
                            DB.commitTransaction(connection);
                            DB.release(connection)
                            EmailGun.sendActivationLink(data.insertId, user.email).then(() => {
                                console.log("Data")
                                resolve("Email has sent for email verification ");
                            });
                        }
                    });
            }).catch(err => {
                reject(err);
            });
        });
    }

    static authUser(user) {
        var email = user.email;
        var password = user.password;
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `select *  from user where email = ?`, email, (err, data) => {
                        DB.release(connection)
                        if (err) {
                            reject(err);
                        } else if (data && data.length > 0) {
                            let hasPass = data[0].password;
                            let user = new User(data[0]);
                            let cs = bcrypt.compareSync(password, hasPass);
                            if (cs) {
                                if (!user.isActive) {
                                    reject({ "msg": "USER_INACTIVE" })
                                } else {
                                    user['token'] = userService.getJWTToken(user);
                                    resolve(user);
                                }
                            } else {
                                reject({ "msg": "INVALID_PASSWORD" })
                            }
                        } else if (data.length == 0) {
                            reject({ "msg": "INVALID_EMAIL" });
                        }
                    });
            }).catch(err => {
                reject(err);
            });
        });
    }

    static resetPass(user) {

        var email = user.email;
        var password = bcrypt.hashSync(user.password, salt);
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `update user set password =? where email = ?`, [password, email], (err, data) => {
                        if (err) {
                            DB.commitTransaction(connection);
                            DB.release(connection)
                            reject(err);
                        } else {
                            DB.rollbackTransaction(connection);
                            DB.release(connection)
                            resolve(data);
                        }
                    });
            });
        });
    }

    static activateUser(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query('update user set is_active =? where id = ?', [1, userId], (err, data) => {

                        if (err) {
                            reject(err);
                        } else {
                            DB.commitTransaction(connection);
                            connection.query('select * from user where id = ?', [userId], (err, data) => {
                                DB.release(connection);
                                if (err) {
                                    reject(err)
                                }
                                else {
                                    let user = new User(data[0]);
                                    resolve(user);
                                }
                            });
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static mapToUser(data) {
        let users;
        users = data.map(item => {
            return new User(item);
        });
        return users;
    }

    static search(key) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                var qr = `select * from user where first_name like "%` + key.replace(/['"]+/g, '') + `%"`;
                console.log("qr...", qr);
                connection = conn;
                connection.query(qr, [], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(userService.mapToUser(data));
                    }
                });
            })
                .catch(err => {
                    reject(err);
                });
        });
    }
    static getAllUser() {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select u.id,u.first_name,u.email,u.role,u.is_active,up.profile_img,
                (select count(*) from collection c where c.user_id = u.id) total_collection,
                (select count(*) from follow_user fu where fu.following_id = u.id) total_followers
                from user u inner join user_profile up on u.id = up.user_id;`, [], (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            let user;
                            if (data && data.length > 0) {
                                user = data.map(item => {
                                    let u = new User(item);
                                    u['total_collection'] = item['total_collection'];
                                    u['total_followers'] = item['total_followers'];
                                    return u;
                                })
                            }
                            resolve(user);
                        }
                    })
            })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static revokeRights(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                DB.beginTransaction(connection);
            })
                .then(() => {
                    connection.query(`update User set is_admin_approved = 0 where id = ?`,[userId],(err,data) => {
                        if(err){
                            reject(err)
                        }else{
                            DB.commitTransaction(connection);
                            DB.release(connection);
                            resolve();
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}

module.exports = userService;