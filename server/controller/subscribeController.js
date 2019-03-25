const webPush = require('web-push');
const config = require('../config/env/index');
const publicVapidKey = config.webPush.publicVapidKey;
const privateVapidKey = config.webPush.privateVapidKey;


webPush.setVapidDetails('mailto:sada.mandal101@gmail.com',publicVapidKey,privateVapidKey);

class subscribeController {

    static subscribe(req, res) {
        const subscription = req.body;
        res.status(201).json({ 'ok': 'ok' });
        const payload = JSON.stringify({ title: "push test" })
        //
        webPush.sendNotification(subscription, payload).catch(err => {
            console.log("err ..", err);
        })
    }
}

module.exports = subscribeController