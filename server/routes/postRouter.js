const express = require('express');
const postRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const PostController = require('../controller/postController');

postRouter.post('/', Auth.isAuthenticated ,PostController.addPost)

postRouter.get('/:postId', Auth.isAuthenticated ,PostController.getPostById)
postRouter.patch('/:postId', Auth.isAuthenticated ,PostController.editPost)

module.exports = postRouter;