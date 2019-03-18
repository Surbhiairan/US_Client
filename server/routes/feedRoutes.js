const express = require('express');
const feedRoutes = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const feedController = require('../controller/feedController');


feedRoutes.get('/', Auth.isAuthenticated, feedController.getFeeds)


module.exports = feedRoutes;