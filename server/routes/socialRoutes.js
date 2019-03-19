const express = require('express');
const socialRoutes = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const PostController = require('../controller/postController');

socialRoutes.post('/socialAuth', Auth.isAuthenticated ,PostController.addPost);

module.exports = postRouter;