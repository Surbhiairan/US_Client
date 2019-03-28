const DB = require('../util/db');
const User = require('../model/user');
const userService = require('../service/userService');

class SocialAuthService {

    static getUserPayload(obj) {
        let payload = {}
        payload['first_name'] = obj['first_name']
        payload['email'] = obj['email']
        payload['password'] = obj['password'];
        payload['role'] = obj['role'];
        payload['is_active'] = obj['is_active']
        payload['is_profile'] = obj['is_profile']
        payload['source'] = obj['source']        
        return payload;
    }

    static getUserProfilePayload(obj) {
        let payload = {}
        payload['profile_img'] = obj['profile_img']
        payload['bio'] = obj['bio'];
        payload['f_link'] = obj['f_link'];
        payload['i_link'] = obj['i_link'];
        payload['t_link'] = obj['t_link'];
        payload['y_link'] = obj['y_link'];
        return payload;
    }

    static checkUser(email, source) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query('select * from user where email =? and source = ?', [email, source], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        let user = null;
                        if (data && data.length > 0) {
                            user = new User(data[0]);
                        }
                        resolve(user);
                    }
                });
            })
        })
    }

    static login(payload) {
        var connection;
        var userPayload = SocialAuthService.getUserPayload(payload);
        var userProfilePayload = SocialAuthService.getUserProfilePayload(payload);
        var isAvail = false;

        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    // Insert for User

                    userPayload = DB.addAttributesForNew(userPayload);
                    return new Promise((r, rj) => {
                        SocialAuthService.checkUser(userPayload['email'], userPayload["source"]).then(user => {
                            if (user) {
                                isAvail = true;
                                r(user);
                            } else {
                                connection.query(
                                    `INSERT INTO user SET ?`, userPayload, (err, data) => {
                                        if (err) {
                                            DB.rollbackTransaction(connection);
                                            DB.release(connection)
                                            rj(err);
                                        } else if (data) {
                                            userPayload['id'] = data.insertId;
                                            r(data.insertId);
                                        }
                                    });
                            }
                        })
                    })
                })
                .then((data) => {
                    // Insert for User Profile
                    userProfilePayload['user_id'] = data;
                    return new Promise((r, rj) => {
                        if (isAvail) {
                            r(data);
                        } else {
                            connection.query(
                                `INSERT INTO user_profile SET ?`, userProfilePayload, (err, data) => {
                                    if (err) {
                                        DB.rollbackTransaction(connection);
                                        DB.release(connection)
                                        reject(err);
                                    } else if (data) {
                                        let insertedId = data.insertId;
                                        r(insertedId)
                                    }
                                });
                        }
                    });

                })
                .then((data) => {
                    DB.commitTransaction(connection);
                    DB.release(connection);
                    let token, user;
                    if (isAvail) {
                        token = userService.getJWTToken(data);
                        user = data
                        user['token'] = token;
                    } else {
                        token = userService.getJWTToken(userPayload);
                        user = new User(userPayload);
                        user['id'] = data;
                        user['token'] = token;
                    }
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = SocialAuthService;
