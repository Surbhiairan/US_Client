const webPush = require('web-push');
const config = require('../config/env/index');
const publicVapidKey = config.webPush.publicVapidKey;
const privateVapidKey = config.webPush.privateVapidKey;
const NotificationService = require('../service/notificationService');

webPush.setVapidDetails('mailto:sada.mandal101@gmail.com', publicVapidKey, privateVapidKey);

class subscribeController {

    static subscribe(req, res) {
        let appUser = req.body['appUser'];
        let userId = appUser.id;
        delete req.body['appUser'];
        const subscription = req.body;

        NotificationService.getNotification(userId).then(notification => {
            res.status(201).json({ 'msg': notification });
            const payload = JSON.stringify({ title: "Notification" , notification : notification })
            
            webPush.sendNotification(subscription, payload).catch(err => {
                res.status(500);
            })
        }).catch(err => {
            console.log(err)
            res.status(500);
        })

    }
}

module.exports = subscribeController