const DB = require('../util/db');

class SocialAuthService {

    static getUserPayload(obj) {
        let payload = {}
        payload['first_name'] = obj['first_name']
        payload['email'] = obj['email']
        payload['password'] = obj['password'];
        payload['role'] = obj['role'];
        payload['is_active'] = obj['is_active']
        payload['is_profile'] = obj['is_profile']
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

    static login(payload) {
        var connection;
        var userPayload = SocialAuthService.getUserPayload(payload);
        var userProfilePayload = SocialAuthService.getUserProfilePayload(payload);

        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction();
            })
                .then(() => {
                    // Insert for User
                    userPayload = DB.addAttributesForNew(userPayload);
                    return new Promise((r, rj) => {
                        connection.query(
                            `INSERT INTO User SET ?`, userPayload, (err, data) => {
                                if (err) {
                                    DB.rollbackTransaction(connection);
                                    DB.release(connection)
                                    rj(err);
                                } else if (data) {                                    
                                    r(data.insertId);                                   
                                }
                            });
                    })
                })
                .then((userId) => {
                    // Insert for User Profile
                    userProfilePayload['user_id'] = userId;
                    return new Promise((r, rj) => {
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
                    });
                    
                })
                .then(() =>{
                    DB.commitTransaction(connection);
                    DB.release(connection);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = SocialAuthService;
