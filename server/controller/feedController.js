const FeedService = require('../service/feedService');

class FeedController {
    static getFeeds(req, res) {
        let userId = req.body['appUser']['id'];
        FeedService.getFeeds(userId).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500);
            res.send(err);
        })
    }
}

module.exports = FeedController;
