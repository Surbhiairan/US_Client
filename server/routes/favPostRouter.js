const express = require('express');
const favPostRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const favPostController = require('../controller/favPostController');


favPostRouter.post('/', Auth.isAuthenticated , favPostController.addFavPost)
favPostRouter.get('/', Auth.isAuthenticated ,favPostController.getFavPost)
favPostRouter.delete('/', Auth.isAuthenticated ,favPostController.delFavPost)


module.exports = favPostRouter;