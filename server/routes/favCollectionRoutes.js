const express = require('express');
const favCollectionRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const favCollectionController = require('../controller/favCollectionController');


favCollectionRouter.post('/', Auth.isAuthenticated ,favCollectionController.addFavCollection)
favCollectionRouter.get('/', Auth.isAuthenticated ,favCollectionController.getFavCollection)
favCollectionRouter.delete('/', Auth.isAuthenticated ,favCollectionController.delFavCollection)


module.exports = favCollectionRouter;