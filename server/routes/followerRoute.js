const express = require('express');
const folllowerRoutes = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const FollowerController = require('../controller/followerController');


folllowerRoutes.post('/', Auth.isAuthenticated, FollowerController.followUser)
folllowerRoutes.get('/', Auth.isAuthenticated, FollowerController.getFollowers)


module.exports = folllowerRoutes;