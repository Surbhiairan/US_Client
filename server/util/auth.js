const config = require('../config/env');
const jwt = require('jsonwebtoken');

class Auth {

    static getToken(req) {
        if (req.headers.token) {
            return req.headers.token;
        }
        return null;
    };

    static isAuthenticated(req, res, next) {
        var token = Auth.getToken(req);
        if (token && token !== null) {
            jwt.verify(token, config.secret, function (err, decodedToken) {
                req.body['appUser'] = decodedToken;

                if (err) {
                    console.log("err....", err);
                    //res.sendStatus(401); 
                    next();
                } else {
                    next();
                }
            });
        } else {
            //res.sendStatus(401); 
            next();
        }
    };

    static isAdminAuthenticated(req, res, next) {
        var token = Auth.getToken(req);
        if (token && token !== null) {
            jwt.verify(token, config.secret, function (err, decodedToken) {
                req.body['appUser'] = decodedToken;
                let role = decodedToken['role']
                if (err) {
                    console.log("err....", err);
                    //res.sendStatus(401); 
                    next();
                } else if (role != 'admin') {
                    //res.sendStatus(401);
                    next()
                } else {
                    next();
                }
            });
        } else {
            //res.sendStatus(401); 
            next();
        }
    };


}
module.exports = Auth