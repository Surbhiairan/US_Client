const express = require('express');
const folllowerRoutes = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const FollowerController = require('../controller/followerController');


folllowerRoutes.post('/', Auth.isAuthenticated, FollowerController.followUser)
folllowerRoutes.get('/', Auth.isAuthenticated, FollowerController.getFollowers)
folllowerRoutes.delete('/', Auth.isAuthenticated, FollowerController.unFollowUser)
folllowerRoutes.get('/followingUser', Auth.isAuthenticated, FollowerController.getFollowingUser)


module.exports = folllowerRoutes;