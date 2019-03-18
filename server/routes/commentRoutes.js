const express = require('express');
const commentRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const CommentController = require('../controller/commentController');


commentRouter.post('/', Auth.isAuthenticated , CommentController.addComment)


module.exports = commentRouter;