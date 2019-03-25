const SocialAuthService = require('../service/socialAuthService');
class SocialAuthController {

    static checkIsValidGlogin(payload) {
        let isValid = false;
        isValid = payload && payload['Zi'] && payload['Zi']['access_token'] && payload['Zi']['id_token']
            && payload['w3']['Eea'] && payload['w3']['ig'] && payload['googleId'] && payload['tokenObj']
            && payload['tokenObj']['token_type'] && payload['tokenId'] && payload['accessToken'] && payload['profileObj']
            && payload['profileObj']['googleId'] && payload['profileObj']['imageUrl'] && payload['profileObj']['email']
            && payload['profileObj']['name'];
        return isValid


    }

    static checkIsValidFBlogin(payload) {
        let isValid = false;
        isValid = payload && payload['name'] && payload['email'] && payload['picture'] && payload['picture']['data']
            && payload['picture']['data']['url'] && payload['id'] && payload['accessToken'] && payload['userID']
        return isValid;
    }

    static BuildPayload(ob) {
        let payload = {};
        if (ob.source == "gg") {
            payload['first_name'] = ob['profileObj']['name'];
            payload['email'] = ob['profileObj']['email'];;
            payload['password'] = "";
            payload['role'] = "";
            payload['is_active'] = 1
            payload['is_profile'] = 1;
            payload['profile_img'] = ob['profileObj']['imageUrl'];;
            payload['bio'] = "";
            payload['f_link'] = "";
            payload['i_link'] = "";
            payload['t_link'] = "";
            payload['y_link'] = "";
            payload['source'] = ob['source'];
        } else if (ob.source == "fb") {
            payload['first_name'] = ob['name'];
            payload['email'] = ob['email'];
            payload['password'] = "";
            payload['role'] = "";
            payload['is_active'] = 1
            payload['is_profile'] = 1;
            payload['profile_img'] = ob['picture']['data']['url'];;
            payload['bio'] = "";
            payload['f_link'] = "";
            payload['i_link'] = "";
            payload['t_link'] = "";
            payload['y_link'] = "";
            payload['source'] = ob['source'];
        }
        return payload;
    }

    static login(req, res) {
        let payload = req.body;
        let isValid = false;
        if (payload['source'] == 'gg') {
            isValid = SocialAuthController.checkIsValidGlogin(payload);
        } else if (payload['source'] == 'fb') {
            isValid = SocialAuthController.checkIsValidFBlogin(payload);
        }
        if (!isValid) {
            res.status(401);
        } else {
            payload = SocialAuthController.BuildPayload(payload)
            //res.status(200).send(payload);
            SocialAuthService.login(payload).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500);
                res.send(err);
            })
        }
    }
}

module.exports = SocialAuthController;