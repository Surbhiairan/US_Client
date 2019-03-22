const AWS = require('../util/aws');
const DB = require('../util/db');
const UserProfile = require('../model/userProfile');
class UserProfileService {

    static addProfile(profile) {
        delete profile['appUser'];
        const imagePayload = profile.profile_img;
        const imgName = new Date().getTime() + ".png";
        var insertedId;
        profile = DB.addAttributesForNew(profile);
        var connection;
        return new Promise((resolve, reject) => {
            AWS.uploadImage(imagePayload, imgName)
                .then(imageURL => {
                    profile.profile_img = imageURL;
                    return DB.getConnection();
                })
                .then(conn => {
                    connection = conn;
                    return DB.beginTransaction(connection);
                })
                .then(() => {
                    return new Promise((r, rj) => {
                        connection.query(
                            `INSERT INTO user_profile SET ?`, profile, (err, data) => {
                                if (err) {
                                    DB.rollbackTransaction(connection);
                                    DB.release(connection)
                                    reject(err);
                                } else if (data) {
                                    insertedId = data.insertId;
                                    UserProfileService.updateUserForProfile(profile.user_id).then(data => {
                                        DB.commitTransaction(connection).then(() => {
                                            r();
                                        })
                                    })
                                }
                            });
                    });
                })
                .then(() => {
                    connection.query(
                        `select * from user_profile where id =  ?`, [insertedId], (err, profile) => {
                            if (err) reject(err)
                            else {
                                DB.release(connection);
                                resolve(new UserProfile(profile[0]));
                            }
                        });
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    static updateUserForProfile(userId) {
        var connection;
        return new Promise((resolve, reject) => {
            connection = DB.getConnection().then(conn => {
                connection = conn;
                connection.query('update user set is_profile = ? where id = ? ', [1, userId], (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            }).catch(err => {
                reject(err);
            })
        })
    }
    static updateProfile(profile) {

        var connection;
        var userProfile;
        return new Promise((resolve, reject) => {

            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        connection.query('select * from user_profile where id = ? ', [profile.user_id], (err, data) => {
                            if (err) { reject(err) }
                            else {
                                userProfile = new UserProfile(data[0]);
                                if (profile.profile_img) {
                                    AWS.updateProfile(profile.profile_img, userProfile.profileImg).then(url => {
                                        resolve(url);
                                    })
                                } else {
                                    resolve(userProfile.profileImg);
                                }
                            }
                        });
                    });
                })
                .then((imageURL) => {
                    userProfile = DB.addAttributesForEdit(userProfile);
                    userProfile.imageURL = imageURL;
                    connection.query(`update user_profile set user_id = ?,profile_img=?,bio=?,
                f_link=?,i_link=?,t_link=?,y_link=?,create_date=?,update_date=?,created_by=?,updated_by=? where id=?`,
                        [profile.user_id, userProfile.imageURL, profile.bio, profile.f_link, profile.i_link,
                        profile.t_link, profile.y_link, userProfile.createDate, userProfile.update_date,
                        userProfile.createdBy, userProfile.updated_by, profile.user_id], (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                reject(err);
                            }
                            else {
                                DB.commitTransaction(connection);
                                connection.query('select * from user_profile where id = ? ', [profile.user_id], (err, data) => {
                                    DB.release(connection);
                                    if (err) {
                                        reject(err)
                                    }
                                    else {
                                        resolve(new UserProfile(data[0]));
                                    }
                                });
                            }
                        });
                }).catch(err => {
                    reject(err);
                });
        });
    }

    static getProfile(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection(conn => {
                connection = conn;
                return connection;
            })
                .then(connection => {
                    connection.query(`select up.id,up.user_id,up.profile_img,up.bio,up.f_link,up.i_link,up.t_link,up.y_link,
                    up.create_date,up.update_date,up.created_by,up.updated_by,u.first_name,u.email,u.role
                    from user_profile up inner join user u on up.user_id = u.id 
                    where up.user_id = ?`, [userId], (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            let userProfile = new UserProfile(data[0]);
                            userProfile['name'] = data[0].first_name
                            userProfile['email'] = data[0].email
                            userProfile['role'] = data[0].role
                            
                            resolve(userProfile);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

}

module.exports = UserProfileService;