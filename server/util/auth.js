const config = require('../config/env');
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
                if (err) {
                    //res.sendStatus(401); -- To Change
                    next();
                } else {
                    next();
                }
            });
        } else {
           // res.sendStatus(401); -- To change
           next();
        }
    };

}
module.exports = Auth